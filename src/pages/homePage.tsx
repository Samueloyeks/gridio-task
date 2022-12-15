import React, {useCallback, useEffect, useState} from 'react';
import {Chart as ChartJS, registerables} from 'chart.js';
import {Chart} from 'react-chartjs-2';
import {Box, Button, FormControlLabel, Grid, Switch, Typography, useTheme} from "@mui/material";
import getEnergyProduction from "../http/solar-energy-prod-service";
import {addHours, formatTimeStamp} from "../helper";


ChartJS.register(...registerables);

const HomePage = (props: any) => {
    const {darkMode, toggleDarkMode} = props;
    const theme = useTheme();

    const [data, setData] = useState(
        {
            labels: [],
            datasets: [{
                label: '# Solar energy production',
                data: [],
                borderWidth: 1
            }]
        }
    );

    const [startTime, setStartTime] = useState(new Date());

    const setPrevTimeRange = () => {
        const minus24Hrs = addHours(startTime, -24);

        setStartTime(minus24Hrs);

    }

    const setNextTimeRange = () => {
        const currEndTime = addHours(startTime, 24);

        setStartTime(currEndTime);
    }

    const fetchData = useCallback(async () => {
        getEnergyProduction(startTime).then((response) => {
            const {data: {data: responseData}} = response;

            const dataObject = {
                labels: responseData.plan.map((planData: any) => formatTimeStamp(planData.timestamp)),
                datasets: [{
                    label: '# Solar energy production',
                    data: responseData.plan.map((planData: any) => planData.production),
                    borderWidth: 1
                }]
            }

            setData(dataObject);
        }).catch((err: any) => {
            alert('Error getting data: ' + err)
        })
    }, [startTime]);


    useEffect(() => {
        fetchData();
    }, [startTime, fetchData]);

    return (
        <Box sx={{p: 4, background: theme.palette.background.paper, height: '100%', boxSizing: "border-box"}}>
            <header>
                <FormControlLabel
                    control={
                        <Switch
                            checked={darkMode}
                            onChange={() => toggleDarkMode()}
                            aria-label="Dark Mode"
                            color="secondary"
                        />
                    }
                    labelPlacement="end"
                    label="Dark Mode"
                />

            </header>
            <Typography variant={"h3"}>Charge your car when energy is cleanest</Typography>
            <Typography variant={"h6"}>Data is shown over a 24hr range</Typography>
            <Box sx={{p: "10px 0"}}>
                <Chart
                    type={"line"}
                    data={data}
                />
            </Box>

            <Grid container p={5}>
                <Grid sm={6} xs={12} item>
                    <Button variant={"contained"} onClick={() => setPrevTimeRange()}>Last 24 hours</Button>
                </Grid>
                <Grid sm={6} xs={12} item display={"flex"} justifyContent={"flex-end"}>
                    <Button variant={"contained"} onClick={() => setNextTimeRange()}>Next 24 hours</Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default HomePage;
