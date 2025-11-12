import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import PageLayout from "layouts/PageLayout";
import { useGetSubcategories } from "queries/ProductQuery";
import TableData from "./tableData";

function Subcategory() {
  const { data, isLoading } = useGetSubcategories({ pageNo: 1, pageCount: 100 });
  console.log(data, isLoading);

  return (
    <PageLayout
      title={'Subcategories'}
      action={
        <Button component={Link} to={`/subcategory/addSubcategory`}>Add Subcategory</Button>
      }
    >
      <TableData />
    </PageLayout>
  );
}

export default Subcategory;
