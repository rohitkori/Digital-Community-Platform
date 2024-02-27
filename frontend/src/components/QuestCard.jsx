import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TourIcon from "@mui/icons-material/Tour";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const QuestCard = ({ data }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {data.city}
            </Typography>
            <Typography variant="h5" component="div">
              {data.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {data.reward}
            </Typography>
            <Typography variant="body2">{data.description}</Typography>
            {/* <Typography sx={{ mb: 1.5 }} color="text.secondary"> */}
              <ListItemButton onClick={handleClick}>
                <ListItemText
                  primary="Leisure Activities"
                />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {data.leisure_activity.split(" ").map((activity, index) => {
                    return (
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <TourIcon />
                        </ListItemIcon>
                        <ListItemText primary={activity} key={index} />
                      </ListItemButton>
                    );
                  })}
                </List>
              </Collapse>
            {/* </Typography> */}
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
};

export default QuestCard;
