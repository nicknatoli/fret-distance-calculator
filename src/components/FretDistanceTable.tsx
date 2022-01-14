import React, { Component } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, TextField } from '@mui/material';
import { FretDistance } from '../models/FretDistance';

interface IFretDistanceTableProps {}

interface IFretDistanceTableState {
  scaleLength: number,
  numberOfFrets: number,
  fretDistances: FretDistance[]
}

export class FretDistanceTable extends Component<IFretDistanceTableProps, IFretDistanceTableState> {  
  columns: GridColDef[] = [
    { field: 'fretNumber', headerName: 'Fret Number', width: 150 },
    { field: 'distanceFromNut', headerName: 'Distance From Nut', width: 300 },
    { field: 'distanceFromPreviousFret', headerName: 'Distance From Previous Fret', width: 300 }
  ];  
  
  constructor(props: IFretDistanceTableProps) {
    super(props);
    this.state = {
      scaleLength: 25.5,
      numberOfFrets: 22,
      fretDistances: []
    };
  }

  getFretDistances(numberOfFrets: number, scaleLength: number): FretDistance[] {        
    let distanceFromNut = 0;    

    return Array.from(Array(numberOfFrets).keys()).map((fretNumber) => {
      const distanceFromPreviousFret = (scaleLength - distanceFromNut) / 17.817;
      distanceFromNut += distanceFromPreviousFret; 
      return {
        id: fretNumber,
        fretNumber,
        distanceFromNut,
        distanceFromPreviousFret
      };
    });
  } 

  setFretDistances(numberOfFrets: number, scaleLength: number): void {        
    this.setState({fretDistances: this.getFretDistances(numberOfFrets, scaleLength)});
  }

  setScaleLength(value: string): void {
    const scaleLength = parseFloat(value);    
    this.setState({scaleLength: isNaN(scaleLength) ? 0 : scaleLength});
  }
  
  setNumberOfFrets(value: string): void {
    const numberOfFrets = parseInt(value);    
    this.setState({numberOfFrets: isNaN(numberOfFrets) ? 0 : numberOfFrets});
  }

  render() {
    return (
  	  <div id="fret-distance-calculator" style={{height: 1000, width: '100%'}}>
        <div id="fret-distance-form">
  	      <h1>Fret Distance Calculator</h1>
  	      <Box
  	        component="form"
  	        sx={{
  	            '& > :not(style)': { m: 1, width: '25ch' },
  	        }}
  	        noValidate
  	        autoComplete="off"
  	      >
  	        <TextField id="number-of-frets" label="Number of Frets" variant="outlined" value={this.state.numberOfFrets} onChange={(event) => { this.setNumberOfFrets(event.target.value); }}/>
            <TextField id="scale-length" label="Scale Length" variant="outlined" value={this.state.scaleLength} onChange={(event) => { this.setScaleLength(event.target.value); }} />
				  	<Button variant="contained" onClick={() => this.setFretDistances(this.state.numberOfFrets, this.state.scaleLength)}>Calculate</Button>
  	      </Box>
  	    </div>
        <div id="fret-distance-table">
          <h2>Fret Distances</h2>
            <DataGrid
              rows={this.state.fretDistances}
              columns={this.columns}
              pageSize={24}
              rowsPerPageOptions={[5]}
              checkboxSelection
          />
        </div>
  	  </div>
    );
  }    
}