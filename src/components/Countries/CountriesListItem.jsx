const CountriesListItem = ({ id, airtime, number, runtime, season, name }) => (
  <tr data-id={id}>
    <td>{name}</td>
    <td>
      Season {season}, Episode {number}
    </td>
    <td>Today at {airtime}</td>
    <td>{runtime? runtime : "???"} minutes</td>
  </tr>
);

export default CountriesListItem;
