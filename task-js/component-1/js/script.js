(function () {
  /**
   * Служебная функция для считывания параметров из адресной строки
   * и определения конфигурации компонента
   * @param  {string} name - имя параметра
   * @return {number} - значение параметра в адресной строке
   */
  const getUrlValue = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get(name), 10);
  };

  /**
   * Настройки аккордеона, параметры получаются из командной строки
   *
   * tabs_limit - number, максимальное количество одновременно открытых элементов,
   * по умолчанию 0 - не ограничено
   *
   * Для тестирования работы своего скрипта при разных значениях tabs_limit
   * временно переопределяйте значение переменной, хранящей этот параметр.
   * Либо можете дописыват GET-параметр с нужным значением в конец адресной строки,
   * например: ?tabs_limit=1
   */
  const settings = {
    tabsLimit: getUrlValue('tabs_limit') || 0,
  };

  /* Код компонента пишите ниже */

  const tabs = document.querySelectorAll('.accordeon-item');
  let isOpened = [];

  tabs.forEach((el, index) => {
    const openTab = () => {
      switch (settings.tabsLimit) {
        case 0:
          tabs[index].classList.toggle('accordeon-item--open');
          break;

        case 1:
          if (tabs[index].classList.contains('accordeon-item--open')) {
            tabs[index].classList.remove('accordeon-item--open');
            return;
          }
          if (!document.querySelector('.accordeon-item--open')) {
            tabs[index].classList.add('accordeon-item--open');
            return;
          } else {
            document.querySelector('.accordeon-item--open').classList.remove('accordeon-item--open');
            tabs[index].classList.add('accordeon-item--open');
          }
          break;

        default:
          if (tabs[index].classList.contains('accordeon-item--open')) {
            tabs[index].classList.remove('accordeon-item--open');
            isOpened = isOpened.filter((el) => el != index);
            return;
          }

          if (isOpened.length === settings.tabsLimit) {
            const swappingEl = isOpened[0];
            tabs[swappingEl].classList.remove('accordeon-item--open');
            isOpened = isOpened.filter((el) => el != swappingEl);
            tabs[index].classList.add('accordeon-item--open');
            isOpened.push(index);
          } else {
            tabs[index].classList.add('accordeon-item--open');
            isOpened.push(index);
          }
      }
    };

    el.addEventListener('click', openTab);
  });
})();
