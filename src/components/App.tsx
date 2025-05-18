// src/App.tsx

import Product from './Product';
import Book from './Book';
import Mailbox from './Mailbox';
import Alert from './Alert';
import Title from './Title';
import Button from './Button';
import UserMenu from './UserMenu';
// 1. Імпортуємо функцію useState

import { useState } from 'react';
import ClickCounter from './clickCounter';
// підняття стану
import LiftStateUpCounter from './LiftStateUpCounter';




export default function App() {
  const handleFirstClick = () => {
    console.log('I am just a button');
  };

  const handleEventClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("I'm a button!", event);
    console.log('Target', event.target);
  };

  //let clicks = 0;
  // 2. Оголошуємо стан clicks
  const [clicks, setClicks] = useState(0);

  const handleCountClick = () => {
    // clicks = clicks + 1;
    // 3. Використовуємо setClicks для зміни стану clicks
    setClicks(clicks + 1);
    console.log(clicks);
  };

  const [count, setCount] = useState(0);

  const [isOn, setIsOn] = useState(false);

  // підняття стану
  const handleClick = () => {
    setClicks(clicks + 1);
  };
  //Декілька станів
  const [count1, setCount1] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick1 = () => {
    setCount1(count1 + 1);
  };

  const toggleMessage1 = () => {
    setIsOpen(!isOpen);
  };

  //Оновлення об'єктів

  interface Values {
    x: number;
    y: number;
    z: number;
  }

  const [values, setValues] = useState<Values>({ x: 0, y: 0, z: 0 });

  // const updateX = () => {};
  // const updateY = () => {};

  //   const updateX = () => {
  // 	// ❌ Це мутація, так не можна
  //   values.x += 1;
  // };
  //Завжди створюйте новий об’єкт і використовуйте оператор spread (...) для оновлення стану через setValues. Інакше ви випадково видалите інші поля, наприклад, y.
  // ✅ Оновлюємо лише x, зберігаючи y

  // const updateX = () => {
  //   setValues({
  //     ...values,
  //     x: values.x + 1,
  //   });
  // }

  // const updateY =() => {
  //   setValues({
  //     ...values,
  //     y: values.y + 1,
  //   });
  // }
  //====Універсальна функція оновлення=====
  // Якщо потрібно однотипно оновлювати кілька полів об’єкта, не обов’язково створювати окрему функцію для кожного поля (updateX, updateY тощо). Можна зробити одну універсальну функцію, яка приймає ключ поля, яке потрібно змінити.

  const updateValue = (key: keyof Values) => {
    setValues({
      ...values,
      [key]: values[key] + 1,
    });
  };

  return (
    <>
      <br />
      <button onClick={handleFirstClick}>посиланн на функцію!</button>
      <br />
      <br />
      <button onClick={() => alert("I'm an ilnline function")}>
        click me!
      </button>
      <br />
      <br />
      <button onClick={handleEventClick}>
        Click me and I will show you event and target!
      </button>
      <br />
      <br />
      <button onClick={handleCountClick}>Current: {clicks}</button>
      <br />

      <p>Лічильник: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>

      <br />
      <p>Стан: {isOn ? 'Включено' : 'Вимкнено'}</p>
      <button onClick={() => setIsOn(!isOn)}>
        {isOn ? 'Вимкнути' : 'Включити'}
      </button>
      <br />
      <br />
      <ClickCounter />
      <ClickCounter />
      <ClickCounter />
      <br />
      <br />

      <LiftStateUpCounter value={clicks} onUpdate={handleClick} />
      <LiftStateUpCounter value={clicks} onUpdate={handleClick} />
      <LiftStateUpCounter value={clicks} onUpdate={handleClick} />
      <br />
      <br />

      <button
        style={{ backgroundColor: 'green', marginRight: '5px' }}
        onClick={handleClick1}
      >
        Clicked: {count1}
      </button>

      <button style={{ backgroundColor: 'green' }} onClick={toggleMessage1}>
        {isOpen ? 'Hide message' : 'Show message'}
      </button>
      {isOpen && <p>🎉 Surprise! You toggled me.</p>}

      <div>
        <p>
          x: {values.x} y: {values.y} z: {values.z}{' '}
        </p>
        <button
          style={{ marginRight: '10px', backgroundColor: 'indigo' }}
          onClick={() => updateValue('x')}
        >
          Update x
        </button>

        <button
          style={{ marginRight: '10px', backgroundColor: 'indigo' }}
          onClick={() => updateValue('y')}
        >
          Update y
        </button>

        <button
          style={{ marginRight: '10px', backgroundColor: 'indigo' }}
          onClick={() => updateValue('z')}
        >
          Update z
        </button>
      </div>

      <h1>Best selling</h1>
      <Product
        name="Tacos With Lime"
        imgUrl="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?w=640"
        price={10.99}
      />
      <Product
        name="Fries and Burger"
        imgUrl="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?w=640"
        price={14.29}
      />
      <Book />
      <Mailbox
        username="Yurii"
        messages={[
          'Hello',
          "Don't forget to practice",
          'Meeting at 3 PM',
          'Wash the car',
        ]}
      />

      <Alert message="Would you like to browse our recommended products?" />
      <Alert
        type="success"
        message="Payment received, thank you for your purchase"
      />
      <Alert type="error" message="Please, settle the due amount" />
      <Title text="CSS-модулі – це окремі .module.css файли, які прив’язані до конкретного компонента." />
      <Button text="WTF" />
      <Button variant="primary" text="Login" />
      <Button variant="secondary" text="Follow" />
      <UserMenu name="Mr. Icon" />    

    </>
  );
}

//Стилізація компонентів

/**
 * вбудовані стилі // через атрибут style={{}}
- Швидко, але обмежено.
- Не підтримує псевдокласи та медіазапити.
- Погано масштабується. 
 * 
 * Ванільний стиль
 -Працює як звичайний CSS, але всі класи глобальні.
- Можливі конфлікти між стилями з різних компонентів. * 
 * 
 * CSS-модулі
 * 
 */

///////////////////////////////////////////////////

/**
 Заняття 2. ==============Обробка подій===============
У React ми додаємо обробники подій без addEventListener. Достатньо передати функцію в атрибут JSX-елемента: onClick, onChange, onSubmit тощо.

======================Обробка кліку===========================

Оголосимо функцію handleClick і передамо посилання на неї в атрибут onClick.
 */
//..................................................//
// console.log("обробка кліку");

// export default function App() {

//   const handleClick = () => {
//     console.log("I'm a button!");
//   };

//   return <button onClick={handleClick}>Click me!</button>;
// }
//.........................................................//

/**handleClick викликається, коли користувач клікає на кнопку.
Ім’я обробника зазвичай починається з handle (за конвенцією). */

//.......................................................//
/**=================Інлайн-функції======================

Іноді зручно передавати інлайн-функцію прямо в JSX – для коротких дій. */
//.......................................................//
// export default function App() {
//   return <button onClick={() => console.log("I'm an inline function!")}>Click me!</button>;
// }
//........................................................//

//============Посилання на функцію======================

//Обробники подій у React мають передаватися саме як посилання функції, а не викликатися одразу.

// // ❌ Викликаємо функцію — вона спрацює одразу при рендері
// <button onClick={handleClick()}>Click me</button>

// // ✅ Передаємо функцію — все працює правильно
// <button onClick={handleClick}>Click me</button>

// // ✅ Те саме стосується й інлайн-функцій
// <button onClick={() => alert("Clicked!")}>Click me</button>

//=============Обʼєкт події===================//

/**Типізація об'єкта події

Об'єкт події слід явно типізувати. Це допомагає:

отримати автодоповнення в редакторі;
уникнути помилок типу;
чітко бачити, з якими типами ви працюєте.

Синтаксис типізації:

(event: React.EventType<HTMLElementType>) 


React.EventType – тип події (MouseEvent, ChangeEvent, FormEvent тощо).

HTMLElementType – тип елемента, до якого прив’язаний обробник 
(HTMLButtonElement, HTMLInputElement тощо).

Коли ви передаєте функцію в onClick, вона автоматично отримує подію кліку миші як аргумент. У React ця подія має тип:

 -- React.MouseEvent<HTMLButtonElement> --

Це означає:

MouseEvent – тип події (від миші);
HTMLButtonElement – елемент, на якому виникла подія (наприклад, кнопка).

export default function App() {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Clicked!", event);
    console.log("Target:", event.target); // сам <button>
  };

  return <button onClick={handleClick}>Click me!</button>;
}
*/
/**
 * Пояснення:

event – це об'єкт події;
React.MouseEvent – тип події;
HTMLButtonElement – тип елемента, до якого прикріплена подія (<button>);


Підсумок

React подає об'єкт події у кожен обробник.
Вказуйте конкретний тип елемента (HTMLButtonElement, HTMLDivElement тощо), щоб мати доступ до потрібних властивостей.
Це дозволяє писати безпечний, зрозумілий і зручний у підтримці код.
 */

//============Реактивність у React===================//

/**Реактивність у React
У React локальні змінні не зберігаються між рендерами і не викликають оновлення інтерфейсу.

Спробуємо підраховувати кліки за допомогою звичайної змінної:

export default function App() {
  let clicks = 0;

  const handleClick = () => {
    clicks = clicks + 1;
    console.log(clicks);
  };

  return <button onClick={handleClick}>Current: {clicks}</button>;
}

Спробуйте додати цей код у компонент і подивіться на результат. Навіть якщо змінна clicks оновлюється, інтерфейс не змінюється. Чому?

React не зберігає локальні змінні між рендерами.
Зміни змінних не змушують React оновлювати інтерфейс.

Щоб інтерфейс оновлювався, потрібно:

Зберігати значення між рендерами.
Явно повідомляти React, що потрібно оновити інтерфейс.
Для цього є вбудована функція useState.


Перепишемо код з використанням стану. Щоб додати змінну стану, імпортуйте useState з React угорі файлу компонента і замінимо локальну змінну clicks. */

/** 
- useState(0) – створює стан зі значенням 0
- clicks – значення стану
- setClicks – функція для зміни стану і запуску повторного рендеру


React зберігає стан компонента між рендерами, і щоразу, коли ми викликаємо setClicks, компонент оновлюється з новим значенням. Саме це і є “реактивність” – React реагує на зміну стану, оновлюючи інтерфейс.


Підсумок

Локальні змінні не підходять для зберігання динамічних значень.
Для цього є стан (useState).
Зміна стану → повторний рендер → оновлений інтерфейс.

/📦 useState завжди повертає масив:

// const [value, setValue] = useState(initialValue);

// Тому ми завжди використовуємо квадратні дужки, а не фігурні (як з об'єктами).*/

//=======Cтан Компонента================//
/**
У React-компонентах часто потрібно щось запам’ятовувати:

_що користувач ввів у форму;
_яке зображення зараз показується;
_скільки товарів у кошику;
_чи натиснута кнопка тощо.

Для цього React має спеціальний механізм – стан компонента (state). 

*Стан – це внутрішні дані компонента, які можуть змінюватися з часом.
*У стані зберігаються тільки ті дані, які змінюються під час роботи.
*На відміну від пропсів (props), які надходять ззовні, стан створюється всередині компонента і живе лише там.
*При кожній зміні стану React автоматично оновлює інтерфейс, щоб він показував актуальні дані.
*/
/**Як React оновлює інтерфейс?

Коли змінюється стан або пропси, React:

_Запускає повторний рендер – викликає функцію компонента ще раз.
_Оновлює JSX – створює нову версію інтерфейсу.
_Порівнює зміни з попередньою версією.
_Оновлює лише те, що змінилося – швидко та ефективно.

Цей процес називається рендерингом, або повторним рендером.

Коли відбувається рендер?

Компонент у React автоматично перерендерюється, коли:

-Оновлюється стан (useState).
-Змінюються пропси, які передає батьківський компонент.

При кожному ререндері React:

-Викликає функцію компонента знову.
-Обчислює новий JSX.
-Оновлює інтерфейс, якщо щось змінилось.


Ререндер — це не оновлення всього DOM, а тільки зміна того, що реально потрібно. Це швидко.


Підсумок

-Стан – це "памʼять" компонента.
-При зміні стану React повторно рендерить компонент і оновлює інтерфейс.
-Це дозволяє створювати інтерактивні, динамічні інтерфейси, які реагують на дії користувача. */

//===============Хук UseState================//

/**У React хук useState дозволяє додати стан у функціональний компонент. Без нього компонент не може "запамʼятовувати" значення між рендерами.

Хуки – це спеціальні вбудовані функції, за допомогою яких можна "підключитися" до різних можливостей React. Усі хуки починаються зі слова use, а стан – це лише одна з їх можливостей.

Спочатку потрібно імпортувати хук у файл компонента:

=== import { useState } from 'react'; ===

Потім всередині функції компонента викликаємо його:

=== const [clicks, setClicks] = useState(0); ===

Хук useState повертає масив із двох значень, який ми деструктуризуємо:

Змінна стану – з актуальним значенням (clicks), початкове значення якої 0
Функція для оновлення – яка змінює значення та запускає ререндер (setClicks)

=== const [значення, функція_оновлення] = useState(початкове_значення) ===

Використовуючи деструктуризацію, можна задати будь-які імена змінних, але конвенції полегшують розуміння коду в різних проєктах. Рекомендовано називати цю пару як [something, setSomething], це допомагає швидко зрозуміти, що це – стан і його оновлювач. */

/**Ось як це виглядає в компоненті:

import { useState } from "react";

export default function App() {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    setClicks(clicks + 1);
  };

  return <button onClick={handleClick}>Current: {clicks}</button>;
}



Як це працює "під капотом":

-Перший рендер: useState(0) → повертає [0, setClicks]
-Натискаємо кнопку: setClicks(1) 
– оновлюємо значення
-React рендерить компонент знову, але тепер значення clicks становить 1
-Компонент знову викликає useState(0), але React вже "памʼятає", 
що значення – 1 → повертає [1, setClicks]
І так далі з кожним кліком
 */
/**============Типізація useState==================//

Хук useState може зберігати будь-які дані тому використовує узагальнений тип (generic), щоб явно вказати, якого типу буде значення стану.



const [count, setCount] = useState<number>(0);



Для простих типів useState автоматично виводить тип із початкового значення.



const [count, setCount] = useState(0);         // number
const [text, setText] = useState("hello");     // string
const [flag, setFlag] = useState(true);        // boolean



Для складніших даних, потрібно вказати тип явно: */

/**==================Локальність стану====================//
 * 
 * 
Стан у React завжди локальний для кожної копії компонента. Якщо ми рендеримо один і той самий компонент кілька разів – кожен екземпляр зберігає свій окремий стан.

Створимо компонент ClickCounter, який підраховує кліки:

import { useState } from "react";

export default function ClickCounter() {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    setClicks(clicks + 1);
  };

  return <button onClick={handleClick}>Clicked: {clicks}</button>;
}

Тепер в App відрендеримо дві кнопки, але вони не залежать одна від одної:

import ClickCounter from "./ClickCounter";

export default function App() {
  return (
    <>
      <ClickCounter />
      <ClickCounter />
    </>
  );
}



Кожна кнопка має свій власний стан. Клік по одній не змінює значення в іншій.



Стан не зберігається глобально – він живе лише в компоненті, де створений.
У кожної копії – свій стан.
Компонент App не має доступу до внутрішнього стану ClickCounter.


Що відрізняє стан від пропсів:

-Props передаються з батька до дитини.
-State – повністю приватний для компонента. */

/**
 * //============Підняття стану===================//
Іноді компоненти мають спільні дані, які мають бути синхронізованими. Наприклад, два або більше компонентів ClickCounter, які мають показувати одну і ту саму кількість кліків.



У такому випадку стан потрібно зберігати в їхньому спільному батьківському компоненті – і передавати через пропси. Це називається підняттям стану.
 */

// Ми переміщаємо clicks до App, і передаємо значення стану clicks як проп value, та handleClicks як проп onUpdate у ClickCounter як пропси.
/**
// src/ClickCounter.tsx

interface ClickCounterProps {
  value: number;
  onUpdate: () => void;
}

export default function ClickCounter({ value, onUpdate }: ClickCounterProps) {
  return <button onClick={onUpdate}>Clicked: {value}</button>;
}
 */

//Тепер обидві кнопки показують однакове значення і змінюють його синхронно.

/**
import { useState } from "react";
import ClickCounter from "./ClickCounter";

export default function App() {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    setClicks(clicks + 1);
  };

  return (
    <>
      <ClickCounter value={clicks} onUpdate={handleClick} />
      <ClickCounter value={clicks} onUpdate={handleClick} />
    </>
  );
} */

//Як це працює
/**
- App – зберігає спільний стан.
-ClickCounter – отримує стан та функцію зміни стану через пропси.
-Коли кнопка натиснута, onClick викликає setClicks, змінює стан в App
-App рендериться з новими даними → кнопки оновлюються. * 
 */
// Підсумок

// - State завжди локальний, якщо не підняти вище.
// - Якщо кілька компонентів повинні працювати зі спільними даними – піднімайте стан у спільного батька.
// - Передавайте дані та функції зміни стану через props.

/**====================Декілька станів======================//
React-компонент може мати скільки завгодно незалежних станів. Для кожної "частинки" даних використовуйте окремий useState. */

// ===========Оновлення об'єктів================= //

// Стан компонента може містити будь-який тип даних, у тому числі об’єкти. Наприклад, збережемо координати x та y в одному об’єкті.

/**
// src/App.tsx

import { useState } from "react";

interface Values {
  x: number;
  y: number;
}

export default function App() {
  const [values, setValues] = useState<Values>({ x: 0, y: 0 });

  const updateX = () => {};
  const updateY = () => {};

  return (
    <div>
      <p>x: {values.x}, y: {values.y}</p>
      <button onClick={updateX}>Update x</button>
      <button onClick={updateY}>Update y</button>
    </div>
  );
}
 */

// Так не потрібно дублювати код, і він стає компактнішим і масштабованим (наприклад, якщо з’явиться поле z, не доведеться нічого переписувати)

// Що тут відбувається:

// keyof Values – означає "всі назви полів в інтерфейсі Values" і обмежує аргумент key до ключів об’єкта Values, тобто "x" або "y".
// values[key] + 1 – читає поточне значення поля.
// [key]: ... – оновлює лише це поле, не чіпаючи інші.

// Тепер, коли ми зробили універсальну функцію updateValue, яка приймає ім’я поля ("x" або "y"), можемо викликати її з різними аргументами – напряму в JSX:

// <button onClick={() => updateValue("x")}>Update x</button>
// <button onClick={() => updateValue("y")}>Update y</button>

// Це чисто, компактно і масштабовано. Якщо згодом з’явиться поле z, вам не потрібно буде переписувати всю логіку – достатньо просто викликати updateValue("z").

/**=================Обмеження хуків===================//
У React хуки мають викликатись лише на верхньому рівні функції компонента.



Це означає:

❌ Не можна викликати хуки всередині умов (if), циклів (for) або вкладених функцій
✅ Потрібно викликати хуки тільки безпосередньо в тілі компонента


function App() {
	// ❌ Так не можна — умова
	if (isLoggedIn) {
	  const [username, setUsername] = useState("");
	}

	// ❌ Так не можна — цикл
	for (let i = 0; i < 3; i++) {
	  const [value, setValue] = useState(0);
	}

  // ...
};

// ✅ Так правильно
function App() {
  const [username, setUsername] = useState("");
	const [value, setValue] = useState(0);
};



🔍 Це правило потрібне, щоб React міг гарантувати стабільний порядок виклику хуків при кожному рендері. Якщо порушити порядок – буде помилка або непередбачувана поведінка. */


console.log("=======lesson 3_REPETA ALEX=============");



