import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const styles = () => {
  return {
    toolBar: {
      height: "10vh",
      display: "flex",
      justifyContent: "space-between",
      padding: "20px",
      backgroundColor: "white",
    },
    logo: {
      color: "blue",
      cursor: "pointer",
    },
    link: {
      color: "#000",
    },
    menuIcon: {
      color: "#000",
    },
    formContainer: {
      flexGrow: 1,
      padding: "10px",
      maxWidth: "700px",
      margin: "30px auto",
    },
    form: {
      marginTop: "30px",
    },
    formHeading: {
      textAlign: "center",
    },
    heroBox: {
      width: "100%",
      display: "flex",
      minHeight: "600px",
      alignItems: "center",
      justifyContent: "center",
    },
    gridContainer: {
      display: "flex",
      alignItems: "center",
      maxWidth: "1300px",
      padding: "50px",
    },
    aboutUsContainer: {
      width: "100%",
      display: "flex",
      minHeight: "400px",
      alignItems: "center",
      justifyContent: "center",
      margin: "30px 0px 50px 0px",
    },
    aboutUsSubtitle: {
      opacity: "0.7",
      paddingBottom: "30px",
      fontSize: "18px",
    },
    title: {
      paddingBottom: "15px",
    },
    subtitle: {
      opacity: "0.4",
      paddingBottom: "30px",
    },
    largeImage: {
      width: "100%",
    },
    sectionGridContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      minHeight: "500px",
    },
    sectionGridItem: {
      backgroundColor: "#f2f0f1",
      textAlign: "center",
      padding: "30px",
      width: "200px",
      borderRadius: "10px",
      margin: "10px !important",
    },
    inputField: {
      marginBottom: "20px !important",
    },
    textArea: {
      width: "100%",
      marginBottom: "20px",
      fontSize: "16px",
      padding: "10px",
    },
    footerContainer: {
      display: "flex",
      alignItems: "center",
      miHeight: "10vh",
      padding: "20px",
      justifyContent: "center",
      backgroundColor: "#f2f0f1",
      flexDirection: "column",
    },
    footerText: {
      paddingBottom: "10px",
    },
    footerDate: {
      opacity: "0.4",
    },
    testimonialCard: {
      backgroundColor: "#fff",
      padding: "10px",
      minHeight: "200px",
      display: "flex",
      alignItems: "center",
    },
    testimonialStatement: {
      paddingBottom: "25px",
    },
    avatar: {
      marginRight: "10px",
    },
    testimonialPosition: {
      fontSize: "14px",
      opacity: "0.6",
    },
  };
};

export const useStyles = makeStyles(styles);

const Homepage = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.heroBox}>
        <Grid container spacing={6} className={classes.gridContainer}>
          <Grid item xs={12} md={7} textAlign="left">
            <Typography variant="h3" fontWeight={700} className={classes.title}>
              Let's scale your business
            </Typography>
            <Typography variant="h6" className={classes.subtitle}>
              Hire professionals who will help your business make 10X your
              previous income. With over 5years experience in Marketing &
              Business strategy, we are your best client.
            </Typography>
            <Link to="/quest">
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "200px", fontSize: "16px" }}
              >
                Search Quest
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={5}>
            <img
              src="https://images.unsplash.com/photo-1519891524955-e25bc774de70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="My Team"
              className={classes.largeImage}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }} className={classes.footerContainer}>
        <Typography className={classes.footerText}>Provided by Team</Typography>
        <Typography className={classes.footerDate}>
          Open-Source Sample - Buit with MUI
        </Typography>
      </Box>
    </>
  );
};

export default Homepage;
