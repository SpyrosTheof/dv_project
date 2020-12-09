import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ArticleCard({ title, content, category }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        action={<IconButton aria-label='settings'></IconButton>}
        title={title}
        subheader={category.name}
      />

      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='edit'>
          <EditIcon />
        </IconButton>
        <IconButton aria-label='delete'>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
