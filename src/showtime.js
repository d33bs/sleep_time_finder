import React, { Component } from 'react';
import FaStarO from 'react-icons/lib/fa/star-o'

//component for the main time page which displays sleep times
export class time_page extends Component {
    constructor(props){
        super(props);
        this.state = {
            current_time: this.current_time(),
            sleep_cycle_times: this.sleep_cycle_times()
        };
    }
    componentDidMount() {
        //When our component mounts, set initial time interval for the remaining
        //seconds in the current minute. Then we begin the minute_timer time
        //interval.
        var date = new Date();
        this.render_interval_init = setTimeout(
            () => { 
                this.update_times(); 
                this.minute_timer();
            },
            (60 - date.getSeconds()) * 1000
        );
    }
    componentWillUnmount() {
        //When our component unmounts remove the timer intervals
        clearInterval(this.render_interval_init);
        clearInterval(this.render_interval);
    }
    minute_timer() {
        //Time interval for updating times at the beginning of each minute
        this.render_interval = setInterval(
            () => {
                this.update_times();
                console.log("this!!!!!");
            },
            60000    
        );
    }
    update_times() {
        //Update our time states
        this.setState({
            current_time: this.current_time(),
            sleep_cycle_times: this.sleep_cycle_times()
        });
    }
    convert_datetime_to_ampm_view(datetime) {
        //Converts datetime objects into non-military AM/PM times
        var hours = ((datetime.getHours() + 11) % 12 + 1);
        var mins = (datetime.getMinutes() < 10? '0' : '') + datetime.getMinutes();
        var ampm = (datetime.getHours() >= 12)? "PM" : "AM";
        var viewdatetime =  hours + ":" + mins + " " + ampm;
        return viewdatetime;
    }
    current_time() {
        //Returns the current time 
        return this.convert_datetime_to_ampm_view(new Date());
    }
    sleep_cycle_times() {
        //Determines 8 wake times based on 90 minute sleep cycles and returns 
        //them in an array.
        var sleep_cycle_time_list = [];
        var currentdate = new Date();
        //Add 15 minutes for the first sleep cycle time to account for average
        //time it takes for someone to fall asleep. (90 + 15 = 105)
        var cycle_addition_minutes = 105;
        
        //Loop to find the wake times, adding 90 minutes each iteration.
        for(var i = 0;i < 8;i++){
            sleep_cycle_time_list.push(
                this.convert_datetime_to_ampm_view(
                    new Date(currentdate.getTime() + (cycle_addition_minutes)*60000)
                )
            );
            cycle_addition_minutes += 90;
        }
        return sleep_cycle_time_list;
    }
    render() {return (
        <div>
           <div className="info">
               <h1>Sleep Time Finder</h1>
                   <p>Use this app to find the best times to wake up based on the average sleep cycle length of 90 minutes. This also factors in the average time it takes for someone to fall asleep - 15 minutes. For best results, try to achieve at least 5 sleep cycles when you rest.</p>
           </div>
           <div className="times">
           <span className="time_wrapper">Current Time: 
               <span className="time_data"> {this.state.current_time}</span>
           </span>
           {this.state.sleep_cycle_times.map((cycle_time, i) =>
               <span className={i+1 === 5 ? 'time_wrapper fifth' : 'time_wrapper'} key={i+1}> Cycle {i+1}: 
                   <span className="time_data"> {cycle_time} </span> 
                   {i+1 === 5? <FaStarO/>:''}
               </span>
           )}
           </div>
        </div>
    );}
}