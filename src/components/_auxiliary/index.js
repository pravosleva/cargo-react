import ContainerGroup from './ContainerGroup';
import Container from './Container';

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
    result should be like this:
        [
        { title: 'ContainerGroup 1',
          children: [
            { title: 'Container 1', carrying, length, width, height,
              children: [
                { title: 'Product 1', length, width, height, weight }] }] }]
  */

  arg_containerGroupList.map((cgroup, cgi, cga) => { // для каждой группы контейнеров...
    let containerGroup = new ContainerGroup({ name: `${cgroup.name} ${cgroup.length}x${cgroup.width}x${cgroup.height}` }),
      container = new Container({ name: `Cont #1`, carrying: cgroup.carrying, length: cgroup.length, width: cgroup.width, height: cgroup.height });//in ${cgroup.name}
    containerGroup.addContainer(container);

    // --
    cgroup.productList.map((prod, pri, pra) => { // ...итерации для каждого продукта в данной группе контейнеров...
      let container = containerGroup.children[containerGroup.children.length-1], // TMP: работаем с последним контейнером
        { name: title, length, width, height, weight, addSize } = prod;
      console.log(addSize)

      // ---
      // попробуем добавыить продукт в контейнер...
      if (container.tryToAdd({ title, length, width, height, weight, addSize })) {
        // added to last container successfully!
        container.setTitle();
      } else {
        // need to create new container...
        let newContainer = new Container({
          name: `Cont #${containerGroup.children.length+1}`, carrying: cgroup.carrying, length: cgroup.length, width: cgroup.width, height: cgroup.height //in ${cgroup.name}
        });
        newContainer.tryToAdd({ title, length, width, height, weight, addSize });
        // мы точно знаем, что продукт гарантировано вмещается в пустой контейнер,
        // иначе груз бы не существовал в этой контейнерной группе.
        newContainer.setTitle();
        containerGroup.children.push(newContainer);
      }
      // ---

    });
    // --

    containerGroup.setTitle();
    result_containerGroupList.push(containerGroup);
  });

  return result_containerGroupList;
}
