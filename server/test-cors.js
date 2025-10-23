#!/usr/bin/env node

/**
 * CORS Configuration Test Script
 * Run this to verify your .env file is properly configured
 * 
 * Usage: node test-cors.js
 */

const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

console.log('\n🔍 CORS Configuration Verification\n');
console.log('=' .repeat(60));

// Check for required environment variables
const requiredVars = {
  'CLIENT_PORT_LOCAL': process.env.CLIENT_PORT_LOCAL,
  'ADMIN_PORT_LOCAL': process.env.ADMIN_PORT_LOCAL,
  'CLIENT_URL': process.env.CLIENT_URL,
  'ADMIN_URL': process.env.ADMIN_URL,
  'NODE_ENV': process.env.NODE_ENV || 'development (default)',
};

let hasIssues = false;

console.log('\n📋 Environment Variables:\n');

Object.entries(requiredVars).forEach(([key, value]) => {
  const status = value ? '✅' : '❌';
  console.log(`${status} ${key.padEnd(20)} = ${value || 'NOT SET'}`);
  
  if (!value && key !== 'NODE_ENV') {
    hasIssues = true;
  }
  
  // Check for trailing slashes
  if (value && typeof value === 'string' && value.endsWith('/')) {
    console.log(`   ⚠️  WARNING: Remove trailing slash from ${key}`);
    hasIssues = true;
  }
  
  // Check for HTTPS/HTTP consistency
  if (key.includes('URL') && value && !value.startsWith('http')) {
    console.log(`   ⚠️  WARNING: ${key} should start with http:// or https://`);
    hasIssues = true;
  }
});

console.log('\n' + '=' .repeat(60));

// Build allowed origins array
const allowedOrigins = [
  process.env.CLIENT_PORT_LOCAL,
  process.env.ADMIN_PORT_LOCAL,
  process.env.CLIENT_URL,
  process.env.ADMIN_URL,
].filter(Boolean);

console.log('\n🌐 Allowed CORS Origins:\n');
allowedOrigins.forEach((origin, index) => {
  console.log(`   ${index + 1}. ${origin}`);
});

console.log('\n' + '=' .repeat(60));

// Check for common issues
console.log('\n🔍 Issue Detection:\n');

if (allowedOrigins.length === 0) {
  console.log('❌ ERROR: No CORS origins configured!');
  hasIssues = true;
} else {
  console.log(`✅ Found ${allowedOrigins.length} allowed origin(s)`);
}

// Check for localhost vs production
const hasLocalhost = allowedOrigins.some(o => o.includes('localhost'));
const hasProduction = allowedOrigins.some(o => !o.includes('localhost'));

if (hasLocalhost) {
  console.log('✅ Local development origins configured');
}

if (hasProduction) {
  console.log('✅ Production origins configured');
} else {
  console.log('⚠️  WARNING: No production URLs found (CLIENT_URL, ADMIN_URL)');
}

// Check for HTTPS in production
if (process.env.NODE_ENV === 'production') {
  const hasHttpInProd = allowedOrigins.some(
    o => !o.includes('localhost') && o.startsWith('http://')
  );
  
  if (hasHttpInProd) {
    console.log('⚠️  WARNING: Production origins should use HTTPS, not HTTP');
    hasIssues = true;
  }
}

// Check for duplicate origins
const uniqueOrigins = [...new Set(allowedOrigins)];
if (uniqueOrigins.length !== allowedOrigins.length) {
  console.log('⚠️  WARNING: Duplicate origins detected');
  hasIssues = true;
}

console.log('\n' + '=' .repeat(60));

// Final verdict
console.log('\n📊 Final Assessment:\n');

if (hasIssues) {
  console.log('❌ ISSUES DETECTED - Please fix the warnings above');
  console.log('\n💡 Common fixes:');
  console.log('   1. Remove trailing slashes from URLs');
  console.log('   2. Add missing CLIENT_URL and ADMIN_URL to .env');
  console.log('   3. Use HTTPS for production URLs');
  console.log('   4. Ensure all URLs start with http:// or https://');
  process.exit(1);
} else {
  console.log('✅ Configuration looks good!');
  console.log('\n🚀 You can now start your server:');
  console.log('   npm start');
  console.log('\n📝 Test CORS after starting:');
  console.log('   curl http://localhost:5000/api/cors-test');
  process.exit(0);
}
