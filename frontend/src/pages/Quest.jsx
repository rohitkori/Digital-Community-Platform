import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, Typography, Box } from "@mui/material";
import QuestCard from "../components/QuestCard";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  marginTop: "20px",
  marginBottom: "20px",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Quest = () => {
  return (
    <Box marginTop="70px">
      <Grid item xs={12} md={7} textAlign="left" sx={{ flexGrow: 1 }}>
        <Typography variant="h3" fontWeight={700}>
          Search Quest
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search Quest…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Grid
          container
          columns={{ xs: 4, sm: 8, md: 12 }}
          //   gap="20px"
          spacing={{ xs: 2, md: 3 }}
        >
          <Grid item>
            <QuestCard />
          </Grid>
          <Grid item>
            <QuestCard />
          </Grid>
          <Grid item>
            <QuestCard />
          </Grid>
          <Grid item>
            <QuestCard />
          </Grid>
          <Grid item>
            <QuestCard />
          </Grid>
          <Grid item>
            <QuestCard />
          </Grid>
          <Grid item>
            <QuestCard />
          </Grid>
          <Grid item>
            <QuestCard />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Quest;
