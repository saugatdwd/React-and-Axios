import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "./Api";


function App() {
  const [myData, setMyData] = useState([]);
  const [, setIsError] = useState<string>('');
  const card = (
    <React.Fragment>
      {myData.map((post) => {
        const { id, first_name, last_name, email, avatar } = post;
        return (
          <Card variant="outlined" key={id} style={{display:'flex', justifyContent:'center'}}>
            <CardContent>
     
                <Typography variant="h5" component="div">
                  
                    {first_name} {last_name}
                  
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                 {email}
                </Typography>

                <Typography variant="body2">
                  <img src={avatar} key={id} />
                </Typography>
              
            </CardContent>
          </Card>
        );
      })}
    </React.Fragment>
  );



  useEffect(() => {
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        setMyData(res.data.data);
      })

      .catch((error) => {
        setIsError(error.message);
        console.log("Error fetching users", error);
      });
    }, []);
    

    const getApiData = async() => {
      try {
        const res = await axios.get("/users");
        setMyData(res.data.data);
        
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message); 
          setIsError(error.message);
        }
      }
    }


    useEffect(()=> {
      getApiData();
    },[])



    return (
      <>

      <Box sx={{ minWidth: 275, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', justifyContent: 'center'  }}>{card}</Box>
      
    </>
  );
}

export default App;
