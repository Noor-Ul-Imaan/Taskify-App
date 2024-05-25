import React from 'react'

const deadlineFormat = (deadline) => {
        const date = new Date(deadline);
        
        // Get day, month, year
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' }); // Get month in words
        const year = date.getFullYear();
      
        // Get hours and minutes
        let hours = date.getHours();
        let minutes = date.getMinutes();
      
        // Add leading zero if minutes < 10
        if (minutes < 10) {
          minutes = '0' + minutes;
        }
      
        // Format time in 24-hour format
        const time = `${hours}:${minutes}`;
      
        return `${day} ${month} ${year}, ${time}`;
    
}

export default deadlineFormat