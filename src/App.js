import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]); // Стейт, где хранятся все пользователи
  const [invites, setInvites] = React.useState([]); //Стейт, отвечающий за приглашенных пользователей
  const [isLoading, setIsLoading] = React.useState(true); // Стейт, отвечающий за состояние загрузки
  const [success, setSuccess] = React.useState(false); // Стейт, отвечающий за состояние загрузки
  const [searchValue, setSearchValue] = React.useState('') //Стейт, отвечающий за введенное значение input

  React.useEffect(() => {
    // При первом рендере отправляем запрос на бекенд
    fetch('https://reqres.in/api/users') // используем функцию fetch и передаем туда ссылку
      .then((res) => res.json()) // получаем ответ и если ответ будет успешным, преобразовываем его в json
      .then((json) => {
        // полученный ответ в json необохдимо вытащить
        setUsers(json.data); // из всего json нужно вытащить data и получить этот массив
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении пользователей');
      })
      .finally(() => setIsLoading(false)); //Если ответ успешен или нет, то меняем состояние загрузки на завершенную
  }, []);

  const onChangeSearchValue = (event) => { // Функция, отвечает за изменение значения в inpup, при вводе значения меняется значение searchValue
    setSearchValue(event.target.value)
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id));
    } else {
      setInvites(prev => [...prev, id]);
    }
  }

  const onClickSendInvites = () => {
    setSuccess(true);
  }

  return (
    <div className="App">
      {
        success ? <Success count={invites.length} /> : <Users
        onChangeSearchValue={onChangeSearchValue}
        searchValue={searchValue}
        items={users} // Передаем массив пользователей внутрь компонента
        isLoading={isLoading} // Передаем состояние загрузки в компонент
        invites={invites}
        onClickInvite={onClickInvite}
        onClickSendInvites={onClickSendInvites}
      />
      }
      
    </div>
  );
}

export default App;
