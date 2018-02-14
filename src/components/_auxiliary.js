export default function sortBySizes (containerGroupList) {
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

  console.group(`sortBySizes () agr`);
  console.log(containerGroupList);
  console.groupEnd(`sortBySizes () agr`);

  //...

  return [{ title: 'MF', children: [{ title: 'WTF' }] }];
}
