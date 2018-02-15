import ContainerGroup from './ContainerGroup';
import Container from './Container';
import Level_algorithm1 from './Level_algorithm1';

export default function sortBySizes (arg_containerGroupList) {
  /*
    containerGroupList as arg example:
    [
      {
        id: str,
        name: str,
        carrying: num,
        length: num,
        width: num,
        height: num,
        hiringPrice: num,
        currency: str,
        productList: [
          {
            id: str,
            name: str,
            length: num,
            width: num,
            height: num,
            weight: num,
            comment: str,
            addSize: num
          }
        ],
        comment: str
      }
    ]
  */

  //console.group(`sortBySizes () agr`); console.log(containerGroupList); console.groupEnd(`sortBySizes () agr`);

  let result_containerGroupList = [];
  /*
    result should be like this: [
        { title: 'ContainerGroup 1',
          children: [
            { title: 'Container 1',
              }] }]
  */

  arg_containerGroupList.map((cg, cgi, cga) => { // для каждой группы контейнеров...
    // ...создаем первую структурную ед. (группу) с первым контейнером с первым левлом.
    let containerGroup = new ContainerGroup({ title: cg.name });
    let container = new Container({ title: `Container as ${cg.name} unit`, carrying: cg.carrying, length: cg.length, width: cg.width, height: cg.height });
    let level = new Level_algorithm1({ widthLimit: cg.width, title: 'Level' });

    container.children.push(level);
    containerGroup.children.push(container);

    // -
    // нужно распределить продукты по контейнерам один за другим...

    cg.productList.map((pr, pri, pra) => { // ...для каждого продукта в данной группе контейнеров...
      container.children.map((l, li, la) => { // ...каждый продукт пытаемся поместить в каждый элемент массива container.children...
        // ...каждый элемент container.children является представителем класса Level_algorithm1

        //...

      });
    });

    // -

    // ...добавляем структурную единицу в результат.
    result_containerGroupList.push(containerGroup);
  });

  return result_containerGroupList;
}
