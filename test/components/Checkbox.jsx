import {useId, useState} from 'react';

export default () => {
    const id = useId();
    const [isChecked, setIsChecked] = useState(false);

    return (
      <div>
          <input
              id={id}
              type="checkbox"
              checked={isChecked}
              onChange={({currentTarget}) => setIsChecked(currentTarget.checked)}
          />
          <label htmlFor={id}>Is checkbox checked: {isChecked}</label>
      </div>
    );
}