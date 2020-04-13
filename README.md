# superShortcut
 iOS super shortcut
## Demo
 [link](https://zhaimick.github.io/superShortcut/demo.html)
 
------

## iBatteryLife

Create donut chart to show iOS battery life.

* ### example

  ```html
  <script src="https://ajax.googleapis.com/ajax/libs/d3js/5.15.0/d3.min.js"></script>
  <script src="app/iBatteryLife/iBatterLife.js"></script>
  <script>
  let iBatteryLife = new IBatteryLife();
  iBatterLife.setBatteryInfo(100, 9000, 8500) // chargeTime designCapacity actualCapacity
  	.showChart('#iBatterLife',function(url){ // it will reply base64 URL
      	//do something
  	});
  </script>
  ```

* ### options

  |                           function                           | intro                                                        |               default                |
  | :----------------------------------------------------------: | ------------------------------------------------------------ | :----------------------------------: |
  | `setBatteryInfo(chargeTimes: number, designCapacity: number, actualCapacity: number)` | Set `chargeTimes`, `designCapacity`, `actualCapacity`.<br>Need to set all at the same time. |                 `-1`                 |
  |               `setTextColor(colorHex: string)`               | Set chart text color                                         |               `black`                |
  |            `setBackgroundColor(colorHex: string)`            | Set chart background color                                   |               `white`                |
  | `setTextIntro(reduced: string, remaining: string, chargeTimes: string)` | Set text for `reduced`, `remaining`, `chargeTimes`           | Reduced<br>Remaining<br>Charge Times |
  |              `setColors(colors: Array<string>)`              | Set chart reduced color and remaining color                  |       `['#1B9E77', '#D95F02']`       |
  |                   `setDebug(on: boolean)`                    | if true will not remove svg chart                            |               `false`                |
  | `showChart(selector: string, callback?: { (imgURL?: string): void })` | Need to set selector to create chart. <br>And callback can set or not set it will reply base64 URL |                                      |

## iMark

Create watermark.

* ### example

  ```html
  <script src="https://ajax.googleapis.com/ajax/libs/d3js/5.15.0/d3.min.js"></script>
  <script src="app/iMark/iMark.js"></script>
  <script>
  let iMark = new IMark();
  iMark.mark('#iMark', function (url) {  // it will create default mark
  	//do something
  });
  </script>
  ```

* ### options

  |                           function                           | intro                                                        | type            |     default      |
  | :----------------------------------------------------------: | ------------------------------------------------------------ | --------------- | :--------------: |
  |                         `getDevices`                         | It will return supported devices                             | Array < string> |                  |
  |                          `getFonts`                          | It will return supported fonts                               | Array < string> |                  |
  |               `setDevice(deviceName: string)`                | Set mark device                                              |                 | `getDevice()[0]` |
  |                   `setFont(font: string)`                    | Set mark font                                                |                 | `getFonts()[0]`  |
  |                 `setColor(colorHex: string)`                 | Set mark color                                               |                 |     `black`      |
  |                   `setDebug(on: boolean)`                    | if true will not remove svg mark                             |                 |     `false`      |
  |              `setMarkRight(markRight: boolean)`              | if true mark will to right and text is to left.              |                 |     `false`      |
  |          `setSloganScaling(sloganScaling: boolean)`          | If true slogan text width will scaled to shot text's width   |                 |     `false`      |
  | `mark(selector: string, callback?: { (imgURL?: string): void })` | Need to set selector to create mark. <br/>And callback can set or not set it will reply base64 URL |                 |                  |

## iMockup

Create mockup.

* ### example

  ```html
  <script src="https://ajax.googleapis.com/ajax/libs/d3js/5.15.0/d3.min.js"></script>
  <script src="app/iMockup/iMockup.js"></script>
  <script>
  let iMockup = new IMockup();
  iMockup.mockup('#iMockup');
  </script>
  ```

* ### options

  |                             enum                             | intro                                                        | type           |                           default                            |
  | :----------------------------------------------------------: | ------------------------------------------------------------ | -------------- | :----------------------------------------------------------: |
  |                        `MockDevices`                         | Mockup Device                                                |                |                                                              |
  |                          `MockType`                          | Mockup type                                                  |                |                                                              |
  |                         **function**                         |                                                              |                |                                                              |
  |    `getModels(devices: MockDevices, mockType: MockType)`     | get Mockup supported model                                   | Array< string> |                                                              |
  | `setDevice(device: MockDevices, mockType: MockType, model: string)` | if call function `mockup` will get here setting.<br>But it's also has default value. |                | `MockDevices.IPhone`<br>`MockType.flat`<br>`getModels(MockDevices.IPhone,MockType.flat)[0]` |
  |              `setScreenColor(hexColor: string)`              | Set mockup screen color                                      |                |                           `black`                            |
  |         `mockup(selector: string, imgURL?: string)`          | Create mockup.<br>If `imgURL` not set it also has default Image to show |                |                                                              |

## svg2png

This is a small function let svg to png, if svg contain Image use this function can easily  contain Image to output png.

Why I Create this function because  in `iMockup` if input Image to svg and create canvas. Let svg to png Image will not contain in png.

* ### example

  ```html
  <script src="app/svg2png/svg2png.js"></script>
  <script>
  svg2png(document.getElementById('iMockupSVG'), 2048 ,function(url){
      // it's will callback base64 url
      // do something
  })
  </script>
  ```

* ### options

  | function                                                     | intro                                                        |
  | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | `svg2png(svg: HTMLElement, size: number, callback: { (imgURL?: string): void })` | `svg` need to use `HTMLElement` <br>`size` means you can set the length of the maximum border<br>`callback` will return base64 URL |

