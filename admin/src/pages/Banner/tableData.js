/* eslint-disable react/prop-types */
import Box from "components/Box";
import Typography from "components/Typography";
import Table from "examples/Tables/Table";
import { Avatar, Icon } from "@mui/material";
import Badge from "components/Badge";
import { Link } from "react-router-dom";
import { useGetBanners } from "queries/StoreQuery";

function Banners({ image, name, desc }) {
  return (
    <Box display="flex" alignItems="center" px={1} py={0.5}>
      <Box mr={2}>
        <Avatar src={image} alt={name} size="sm" variant="rounded" />
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography variant="button" fontWeight="medium">
          {name}
        </Typography>
        <Typography variant="caption" color="secondary">
          {desc}
        </Typography>
      </Box>
    </Box>
  );
}

const TableData = () => {
  const { data, isLoading, error } = useGetBanners({ pageNo: 1, pageCount: 100 });
  
  // Debug logging
  console.log('Banner data:', data);
  console.log('Loading state:', isLoading);
  console.log('Error:', error);
  const columns = [
    { name: "Banners", align: "left" },
    { name: "url", align: "center" },
    { name: "status", align: "center" },
    { name: "createdon", align: "center" },
    { name: "Lastupdated", align: "center" },
    { name: "action", align: "center" },
  ]

  const rows = data?.data?.map(item => ({
    Banners: <Banners image={`${process.env.REACT_APP_API_URL}/uploads/${item?.image}`} name={item?.title} desc={item?.subtitle} />,
    url: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        <a href={item?.url}>{item?.url}</a>
      </Typography>
    ),
    status: (
      <Badge variant="gradient" badgeContent={item?.status ? 'Available' : 'Unavailable'} color={item?.status ? "success" : 'secondary'} size="xs" container />
    ),
    createdon: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {new Date(item?.createdAt).toDateString()}
      </Typography>
    ),
    Lastupdated: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {new Date(item?.updatedAt).toDateString()}
      </Typography>
    ),
    action: (
      <Link to={`/banners/editBanner/${item?._id}`}>
        <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
          more_vert
        </Icon>
      </Link>
    ),
  }))
  if (error) {
    return <Typography fontSize={14} sx={{ paddingX: 5, color: 'red' }}>Error loading banners: {error.message}</Typography>;
  }
  
  return isLoading ? <Typography fontSize={14} sx={{ paddingX: 5 }}>loading...</Typography> : <Table columns={columns} rows={rows || []} />
};

export default TableData;
