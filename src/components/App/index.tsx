import './index.css';

import React, { useEffect, useState } from 'react';
import { AppBar, Container, Toolbar, Typography, Button } from '@material-ui/core';
import { DataGrid, GridColDef, GridColumns } from '@material-ui/data-grid';
import { getVideos } from '../../services/videos';
import { ProcessedVideo } from '../../common/interfaces';

const App: React.FC = () => {
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getVideos()
      .then((videos: ProcessedVideo[]) => {
        setLoading(false);
        setVideos(videos);
      });
  }, []);

  const generalOptions: GridColDef = {
    field: 'id',
    flex: 1,
  };

  const columns: GridColumns = [
    {
      ...generalOptions,
      field: 'name',
      headerName: 'Video name',
    },
    {
      ...generalOptions,
      field: 'author',
      headerName: 'Author',
    },
    {
      ...generalOptions,
      field: 'categories',
      headerName: 'Categories',
    },
    {
      ...generalOptions,
      field: 'format_quality_highest',
      headerName: 'Highest quality format',
    },
    {
      ...generalOptions,
      field: 'date_release',
      headerName: 'Release date',
    },
    {
      ...generalOptions,
      headerName: 'Options',
      field: '',
      sortable: false,
      renderCell: () => (
        <>
          <Button variant="contained" color="primary" style={{ marginRight: 10 }}>
            Edit
          </Button>

          <Button variant="contained" color="secondary">
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Videos</Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <DataGrid rows={videos} columns={columns} loading={loading} className="movingimage__datagrid" />
      </Container>
    </>
  );
};

export default App;
