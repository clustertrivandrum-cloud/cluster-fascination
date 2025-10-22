import React,{useState,useEffect} from 'react';
import axiosInstance from '../axios'
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
import { ServerURL } from '../services/baseUrl';

const Blogs = () => {
  const [blog,setBlog] = useState([])

let urlQuery = '';

  useEffect(()=>{

    urlQuery=`/api/v1/blogs`

    const fetchData = async()=>{

      try {

        const response = await axiosInstance.get(urlQuery);
        setBlog(response.data.data)
        console.log(response.data.data)
        
      } catch (error) {
        console.log(error)
      }

    }


    fetchData()


  },[])

  //date format
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    return `${formattedDate} `;
  };
  


  // Dummy data for demonstration
  const blogs = [
    {
      id: 1,
      title: 'Blog Title 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel erat vitae nisi consectetur tempus.',
      author: 'John Doe',
      date: 'April 25, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1483996887144-ede479a83102?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mjh8MjEwMDExNXx8ZW58MHx8fHx8'
    },
    {
      id: 2,
      title: 'Blog Title 2',
      content: 'Nullam ac nisi vitae nulla congue aliquet. Curabitur quis sem id ipsum rutrum consectetur.',
      author: 'Jane Smith',
      date: 'April 26, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1483996887144-ede479a83102?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mjh8MjEwMDExNXx8ZW58MHx8fHx8'
    },
    // Add more blog objects as needed
  ];

  return (
    <>
      <TopNav/>
     <MiddleNav/>
     <MainNav/> 
      <div className="container py-5" style={{position: 'relative'}}>
        {/* Decorative watercolor spots */}
        <div className="watercolor-spot spot-mint" style={{width: '220px', height: '220px', top: '80px', right: '5%', opacity: '0.12'}}></div>
        <div className="watercolor-spot spot-beige" style={{width: '200px', height: '200px', bottom: '100px', left: '3%', opacity: '0.1'}}></div>
        
        <div className="text-center mb-5">
          <h2 className="elegant-script" style={{fontSize: '3rem', color: 'var(--text-dark)'}}>
            Style Guide
          </h2>
          <p style={{fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-muted)', fontStyle: 'italic'}}>
            <span className='flower-accent'>✿</span> Curated Wellness Insights <span className='flower-accent'>✿</span>
          </p>
          <div className="section-divider"></div>
        </div>
        
        <div className="row">
          {blog.map(item => (
            <div className="col-lg-6 mb-4" key={item._id}>
              <div className="card-cluster" style={{overflow: 'hidden', height: '100%'}}>
                <div style={{height: '400px', overflow: 'hidden'}}>
                  <img 
                    src={`${ServerURL}/uploads/${item.image}`} 
                    className="w-100" 
                    alt={item.title} 
                    style={{
                      height:'100%', 
                      objectFit:'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div className="p-4">
                  <h5 style={{
                    fontFamily: 'var(--font-elegant-script)',
                    fontSize: '1.8rem',
                    color: 'var(--dark-mint)',
                    marginBottom: '15px'
                  }}>{item.title}</h5>
                  <p style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1rem',
                    lineHeight: '1.7',
                    color: 'var(--text-dark)'
                  }}>{item.description}</p>
                  <p className="mt-3" style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)'
                  }}>
                    <small>
                      By <span style={{color: 'var(--primary-mint)', fontWeight: '600'}}>Cluster Fascination</span> on {formatDate(item.createdAt)}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Blogs;
