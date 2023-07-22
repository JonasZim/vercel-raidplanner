
interface MapProps {
    square: boolean;
    radials: number;
    grids: Grid[];
}

interface Grid {
    rows: number;
    columns: number;
    coloring: boolean[];
}

export default class MapModel {
    square: boolean;
    radials: number;
    grids: Grid[];
    //colorGrid: Grid;

    constructor(props: MapProps) {
        this.square = props.square;
        this.grids = props.grids;
        this.radials = props.radials;
        //this.colorGrid = this.smallestGridMultiple(this.grids);
        //this.initialColoring(this.colorGrid);
        this.grids.forEach(grid => {
            if(grid.coloring.length !== grid.rows*grid.columns){
                this.initialColoring(grid);
            }
        });
    }
/*
    smallestGridMultiple = (grids: Grid[]) => {
        const cGrid = grids.reduce((newGrid:Grid, currentGrid:Grid) => {
            newGrid.columns = lcm(newGrid.columns, currentGrid.columns);
            newGrid.rows = lcm(newGrid.rows, currentGrid.rows);
            newGrid.coloring = [];

            return newGrid;

        }, {columns: 1, rows: 1, coloring: []});

        return cGrid;
    };
*/
    initialColoring = (grid: Grid) => {
        for(let i = 0; i < grid.rows; i++) {
            for(let k = 0; k < grid.columns; k++) {
                grid.coloring[i*grid.columns + k] = false;
            }
        }
    }
}

export type { Grid };