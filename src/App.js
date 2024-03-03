import React from 'react';
import Data from './data.json'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import './App.css';


const styles = {       //css styling
  tableHeader: {
    border: '1px solid #dddddd',
    textAlign: 'center',
    padding: '8px',
    
  },
  tableCell: {
    border: '1px solid #dddddd',
    textAlign: 'center',
    padding: '8px',
    
  },
  table:{ 
    borderCollapse: 'collapse',
    width: '100%' ,
    margin: '30px',
  }
};                   //css styling

function sortData(data, column, order) {
  return data.sort((a, b) => {
    const aValue = column === 'date' ? new Date(a.date_component) : a.time_components;
    const bValue = column === 'date' ? new Date(b.date_component) : b.time_components;
    if (order === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
}

function App() {

  const [currPage, setcurrPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const recordperpage = 20;
  const lastindex = currPage * recordperpage;
  const firstindex = lastindex - recordperpage;

  const filteredData = Data.filter((item) => {
    return item.cname.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.loc.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const sortedData = sortBy ? sortData(filteredData, sortBy, sortOrder) : filteredData;

  const records = sortedData.slice(firstindex, lastindex);
  const npage= Math.ceil(sortedData.length / recordperpage);
  const nums= [...Array(npage + 1).keys()].slice(1);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setcurrPage(1); // Reset pagination to page 1 when search term changes
  };
  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };



    return (
        <div >
          <ul className='toplist'>
            <li ><input
                  type="text"
                  placeholder="Search by name or location"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className='searchbox'
                /></li>
            <li><button onClick={() => handleSort('date')} className='button --pulse'>Sort by Date</button></li>
            <li><button onClick={() => handleSort('time')} className='button --pulse'>Sort by Time</button></li>
          </ul>
          

          
            

            <table style={styles.table}>
              <thead>
                  <th style={styles.tableHeader}>Serial no.</th>
                  <th style={styles.tableHeader}>Customer name</th>
                  <th style={styles.tableHeader}>Age</th>
                  <th style={styles.tableHeader}>Phone no.</th>
                  <th style={styles.tableHeader}>Location</th>
                  <th style={styles.tableHeader} colSpan="2">Created at</th>
              </thead>
              <tr>
              <th style={styles.tableHeader}></th>
        <th style={styles.tableHeader}></th>
        <th style={styles.tableHeader}></th>
        <th style={styles.tableHeader}></th>
        <th style={styles.tableHeader}></th>
        <th style={styles.tableHeader}>Date</th>
        <th style={styles.tableHeader}>Time</th> 
              </tr>
              <tbody>
                {records.map((d,i) =>
                  <tr key={i}>
                      <td style={styles.tableCell}>{d.sno}</td>
                      <td style={styles.tableCell}>{d.cname}</td>
                      <td style={styles.tableCell}>{d.age}</td>
                      <td style={styles.tableCell}>{d.phn}</td>
                      <td style={styles.tableCell}>{d.loc}</td>
                      <td style={styles.tableCell}>{formatDate(d.date_component)}</td>
                      <td style={styles.tableCell}>{formatTime(d.time_components)}</td>
                  </tr>
                )}
              </tbody>
            </table>
            <nav>
              <ul className='pagination'>
                <li className='page-item'>
                  <a href='#' className='page-link'
                  onClick={prePage}>Prev</a>
                  </li>
                {
                nums.map((n, i) => (
                <li className={`page-item ${currPage == n? 'active' : ''}`} key={i}>
                <a href='#' className='page-link'
                onClick={() => changeCPage(n)} > {n}</a>
                </li>
                ))
                }
                <li className='page-item'>
                <a href='#' className='page-link'
                onClick={nextPage}>Next</a>
                </li>
                </ul>
            </nav>
        </div>
    )

function formatTime(timeString) {
      const [hours, minutes, seconds] = timeString.split(':');
      return `${hours}:${minutes}:${Math.floor(Number(seconds))}`;
    }

function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    }
    

function nextPage(){
  if(currPage !== lastindex){
    setcurrPage(currPage + 1)
  }
}

function changeCPage(id){
  setcurrPage(id)
}

function prePage(){
  if(currPage !== firstindex){
    setcurrPage(currPage - 1)
  }

}

}

export default App;
