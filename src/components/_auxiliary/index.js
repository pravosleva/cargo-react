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
    for example: [
      { title: 'ContainerGroupName',
        children: [
          { title: 'ContainerGroup1',
            children: [
              { title: 'Container 1',
                }] }] }]
  */

  arg_containerGroupList.map((cg, cgi, cga) => { // для каждой группы контейнеров...
    let containerGroup = { title: cg.name, children: [] };
    let container = new Container({ carrying: cg.carrying, length: cg.length, width: cg.width, height: cg.height });
    let level = new Level_algorithm1({ widthLimit: cg.width, title: 'Level' });

    container.children.push(level);
    containerGroup.children.push(container);

    // need to add products to container one by one...

    cg.productList.map((pr, pri, pra) => { // ...для каждого продукта...
      let productPut = false;
      container.children.map((l, li, la) => { // ...каждый продукт пытаемся поместить в каждый элемент массива container.children...
        // ...каждый элемент container.children является представителем класса Level_algorithm1
        /* NOT CORRECTLY!
        if (l.tryToSaveCargo(pr)) { // ...усешно в текущий level=)
          productPut = true;
        } else {
          let level = new Level_algorithm1({ widthLimit: cg.width, title: '+Level' }); // но еще неизвестно, добавим  ли его в контейнер?

          if (level.tryToSaveCargo(pr)) { // ...усешно в новый level=)
            //container.children.push(level); // ...пришлось создать новый level.
            //productPut = true;
          } else {
            // ...нужно заводить новый контейнер! ->
          }
        }
        */
      });
      if (productPut===false) { // -> если продукт все еще не пристроен - заводим новый контейнер.
        containerGroup.children.push(container);
      }
    });

    //...

    result_containerGroupList.push(containerGroup);
  });

  return result_containerGroupList;
}
