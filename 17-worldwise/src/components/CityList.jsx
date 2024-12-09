import styles from './CityList.module.css';
import CityItem from './CityItem';
import Message from './Message';
import Spinner from './Spinner';

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message='Add your first city by clickign on the map!' />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
