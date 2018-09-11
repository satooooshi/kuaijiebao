import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";
import CryptoCard from 'react-ui-cards';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
});


const cards = [{id:"1",name:"P&G",period:253,transitionId:123,rate:"3.6560",minPrice:50000,risk:"middle",buyDue:"9/20",productor:"P&G",addedTime:"8/7",description:"This is good one."},
    {id:"1",name:"P&G",period:253,rate:"3.6560",transitionId:123,minPrice:50000,risk:"middle",buyDue:"9/20",productor:"P&G",addedTime:"8/7",description:"This is good one."},
    {id:"2",name:"P&G",period:253,rate:"3.6560",transitionId:123,minPrice:50000,risk:"middle",buyDue:"9/20",productor:"P&G",addedTime:"8/7",description:"This is good one."},
    {id:"3",name:"P&G",period:253,rate:"3.6560",transitionId:123,minPrice:50000,risk:"middle",buyDue:"9/20",productor:"P&G",addedTime:"8/7",description:"This is good one."},
    {id:"4",name:"P&G",period:253,rate:"3.6560",transitionId:123,minPrice:50000,risk:"middle",buyDue:"9/20",productor:"P&G",addedTime:"8/7",description:"This is good one."},
    {id:"5",name:"P&G",period:253,rate:"3.6560",transitionId:123,minPrice:50000,risk:"middle",buyDue:"9/20",productor:"P&G",addedTime:"8/7",description:"This is good one."},
    {id:"6",name:"P&G",period:253,rate:"3.6560",transitionId:123,minPrice:50000,risk:"middle",buyDue:"9/20",productor:"P&G",addedTime:"8/7",description:"This is good one."}];


function getFPFromServer(success) {
    return axios.get('http://localhost:2222/fp')
        .then(function (response) {
            console.log(response);
            return response.data;
        })
        .then(success)
        .catch(function (error) {
            console.log(error);
        });
}

class Album extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
        };
    }

    componentDidMount() {
        getFPFromServer((data)=>this.setState({
            data:data
        }));
    }


    render() {
        const { classes } = this.props;
        let data=this.state.data;
        return (
            <React.Fragment>
                <CssBaseline/>
                <main>
                    {/* Hero unit */}
                    <div className={classes.heroUnit}>
                        <div className={classes.heroContent}>
                            <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
                                Top Financial Products To Build Wealth And Retire Early!!
                            </Typography>
                            <Typography variant="title" align="center" color="textSecondary" paragraph>
                                Something short and leading about the collection below—its contents, the creator, etc.
                                Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                                entirely.
                            </Typography>
                            <div className={classes.heroButtons}>
                                <Grid container spacing={16} justify="center">
                                    <Grid item>
                                        <Button variant="contained" color="primary">
                                            Go Manage My FP
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" color="primary">
                                            See Q&A
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                    <Typography variant="title" align="center" gutterBottom>
                        Fixed Term
                    </Typography>
                    <div className={classNames(classes.layout, classes.cardGrid)}>
                        {/* End hero unit */}
                        <Grid container spacing={40}>
                            {data.map(card => (
                                <Grid item key={card.id} sm={6} md={4} lg={3}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                                            title="Image title"
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography>
                                                {card.name}
                                            </Typography>
                                            <Typography gutterBottom variant="headline" component="h2">
                                                {card.rate} %
                                            </Typography>
                                            <Typography>
                                                start:{parseDate(card.buyDue)}, minmum:¥ {card.minPrice}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                View
                                            </Button>
                                            <Button size="small" color="primary">
                                                Buy
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </main>
                {/* Footer */}
                <footer className={classes.footer}>
                    <Typography variant="title" align="center" gutterBottom>
                        Footer
                    </Typography>
                    <Typography variant="subheading" align="center" color="textSecondary" component="p">
                        Something here to give the footer a purpose!
                    </Typography>
                </footer>
                {/* End footer */}
            </React.Fragment>
        );
    }
}

Album.propTypes = {
    classes: PropTypes.object.isRequired,
};

//format Date
function parseDate(date){
    if(date) return date[0]+'/'+date[1]+'/'+date[2];
    else return date;
}


export default withStyles(styles)(Album);