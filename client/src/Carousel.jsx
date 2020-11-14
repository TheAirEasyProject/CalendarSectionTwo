import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class Carousel extends React.Component {
  constructor() {
    super();
    this.state = {
      date: 0,
      carousel: [],
    };
    this.generateCal = this.generateCal.bind(this);
    this.changeDates = this.changeDates.bind(this);
  }

  componentDidMount() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    for (let i = 0; i < 12; i += 1) {
      this.generateCal(year, month);
    }
  }

  changeDates(dir) {
    if (dir === 'f') {
      this.setState({ date: this.state.date + 1 });
    } else {
      this.setState({ date: this.state.date - 1 });
    }
  }

  generateCal(y, m) {
    // Create an array of the empty days on the first week of the month
    const emptyDays = [];
    for (let i = 0; i < (new Date(y, m)).getDay(); i += 1) {
      emptyDays.push(<td className="day">{''}</td>);
    }
    // Create an array of all the other days in the month
    const daysInTheMonth = [];
    for (let i = 1; i <= (new Date(y, m, 0).getDate()); i += 1) {
      daysInTheMonth.push(<td className="day calDay">{i}</td>);
    }
    // Concat the two together to get an array showing all empty days and days in the month
    const total = emptyDays.concat(daysInTheMonth);
    // Define a rows array to add your 'row' of 7 <td> cells elements into
    const rows = [];
    let row = [];
    // Iterate through the complete array
    for (let i = 0; i < total.length; i += 1) {
      // If the day is not divisible by 7, add it to the row
      if (i % 7 !== 0) {
        row.push(total[i]);
      // Otherwise, push the entire row into the rows array,
      // empty out the row, and add the next cell into the row
      } else {
        rows.push(row);
        row = [];
        row.push(total[i]);
      }
      // At the end, push the last row into the rows array
      if (i === total.length - 1) {
        rows.push(row);
      }
    }
    // Create the table for the entire month
    const calendar = rows.map((r) => <tr>{r}</tr>);
    const newCarousel = this.state.carousel;
    newCarousel.push(calendar);
    this.setState({
      carousel: newCarousel,
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.changeDates('b')} type="button">
          Before
        </button>
        <button onClick={() => this.changeDates('f')} type="button">
          Next
        </button>
        <div className="carousel">
          <div>
            <div>{this.state.date}</div>
            <table className="table">
              <thead>
                <tr>
                  <th>Su</th>
                  <th>Mo</th>
                  <th>Tu</th>
                  <th>We</th>
                  <th>Th</th>
                  <th>Fr</th>
                  <th>Sa</th>
                </tr>
              </thead>
              <tbody>
                {this.state.carousel[this.state.date]}
              </tbody>
            </table>
          </div>
          <div>
            <div>{this.state.date}</div>
            <table className="table">
              <thead>
                <tr>
                  <th>Su</th>
                  <th>Mo</th>
                  <th>Tu</th>
                  <th>We</th>
                  <th>Th</th>
                  <th>Fr</th>
                  <th>Sa</th>
                </tr>
              </thead>
              <tbody>
                {this.state.carousel[this.state.date + 1]}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
};

export default Carousel;