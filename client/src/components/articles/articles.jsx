import React, { useEffect, useState } from 'react';
import ArticleCard from './article_card';
import Aux from '../../hoc/auxiliary';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AxiosConfig from '../../axios/axiosConfig';

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    AxiosConfig.get('api/articles/all')
      .then((res) => setArticles(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        width: '95vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        marginTop: '3%',
      }}
    >
      <Grid container spacing={3}>
        {articles.map((article) => {
          return (
            <Grid item xs={12} sm={4} lg={3}>
              <Link to='/' style={{ textDecoration: 'none' }}>
                <ArticleCard {...article} />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
