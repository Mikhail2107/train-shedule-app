# train-shedule-app

Открыть приложение на Vercel:
https://train-shedule-app-57nu.vercel.app/
 
Приложение Расписание ближайших по времени электричек на станции расположенной шаговой  доступности или поблизости.

Для получения данных расписания использзован API и api_key для разработки Яндекс.Расписания.

гибкая и адаптивная верстка под размеры экранов любых устройств.

получение геолокации устройства, в том числе мобильного (смартфона) для получения доступных в шаговой доступности станций и вокзалов, откуда возможно добраться до необходимого вокзала.*

local storage для хранения расписания между сеансами

для этого предоставляется списсок ближайших трех маршрутов следующих через станцию отправления (ближаййшую по геолокации) до станции прибытия (указанный как приоритет)

Typescript, React, MobX, React-Router, API Яндекс.Расписания, Javascript, HTML/CSS, local storage, компонентная архитектура

В данный момент установленны заглушками две станции: Батайск и Заречная. Если пользователь находится в шаговой доступности до станции Батайск, то получит расписание от станции Батайск до тсанции Заречная. И наоборот, если рядом со станцией Заречная, то получит расписание ближайших трех рейсов до станциии Батайск