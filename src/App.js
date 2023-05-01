import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]); // Стейт, где хранятся все пользователи
  const [isLoading, setIsLoading] = React.useState(true); // Стейт, отвечающий за состояние загрузки

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

  return (
    <div className="App">
      <Users
        items={users} // Передаем массив пользователей внутрь компонента
        isLoading={isLoading} // Передаем состояние загрузки в компонент
      />
      {/* <Success /> */}
    </div>
  );
}

export default App;
