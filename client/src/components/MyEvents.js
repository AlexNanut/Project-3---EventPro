import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_MY_EVENTS } from "../utils/queries";

function MyEvents (){
    const { loading, error, data } = useQuery(GET_MY_EVENTS);
    useEffect(()=>{
        console.log(data)
      }, [data])
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  
    return (<div>
        <h1>My Events</h1>
        <div>
            <h3> Created Events</h3>
            {
                data.me.createdEvents && data.me.createdEvents.map((createdEvent,i)=>{
                    return <div key={i}>{createdEvent.title}</div>
                })
            }
            <h3> Attending Events</h3>
            {
                data.me.events && data.me.events.map((event,i)=>{
                    return <div key={i}>{event.title}</div>
                })
            }
        </div>
        </div>)
}
export default MyEvents