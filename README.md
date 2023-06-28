# Verify4js
PDF файлын Notly системээр блокчэйн дээр баталгаажсан эсэхийг шалгах сан.

### Суулгах заавар

npm-ээс татаж авч суулгах эсвэл шууд эх кодыг хуулж авч ашиглаж болно. <br/>
```npm install verify4js```

### Ашиглах заавар
```
import * as Verify from "verify4js";

Verify.verify(pdfArrayBuffer, nodeUrl)
.then(res => { // console.log(res); })
.catch(err => { console.error(err.message); })
```
#### Фронтэнд Жишээ:
```
<input type="file" name="file" onChange={handleFileChange} />

function handleFileChange(event) {
const selectedFile = event.target.files[0];
const fileType = ["application/pdf"];

if (selectedFile) {
  if (fileType.includes(selectedFile.type)) {
    const reader = new FileReader(); 
    reader.onload = (e) => { 
      const view = new Int8Array(e.target.result); 
      Verify.verify(view)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error("test", err.message); 
        });
      setFile(e.target.result);
    };
    reader.readAsArrayBuffer(selectedFile);
  } else {
    setFile(null);
  }
}
}
```
#### Backend жишээ:

```
const { verify } = require('verify4js');
verify(pdfArrayBuffer, nodeUrl)
.then(res => { // console.log(res); })
.catch(err => { console.error(err.message); })
```

### Параметрүүд

- **pdfArrayBuffer** нь pdf файлаа уншиж аваад ArrayBuffer төрөлд хөрвүүлсэн утга
- **nodeUrl** нь блокчэйний node-ий хаяг. Утга зааж өгөхгүй бол TEO-ийн public node рүү заана

### Гаралт

```
export interface VerifyResultInterface { 
  state: 'REVOKED' | 'EXPIRED' | 'ISSUED' | 'APPROVE_PENDING' | 'INVALID',
  metadata: MetaDataInterface, 
  cert: {}, 
  issuer: {isActive?: boolean}, 
  isTestnet: boolean, 
  isUniversity?: boolean 
}
```

##### state нь
- ISSUED бол баталгаажсан файл. 
- REVOKED бол хүчингүй болгосон файл
- EXPIRED бол хугацаа нь дууссан файл,
- APPROVE_PENDING бол их сургуулийн диплом БЕГ баталгаажуулахыг хүлээж буй
- INVALID бол баталгаажаагүй файл.
##### metadata нь 
файлд нэмэлтээр бичсэн утгууд.
##### cert нь 
блокчэйн дээр бичигдсэн мэдээлэл.
##### issuer нь 
баталгаажуулагчийн мэдээлэл.
##### isTestnet нь 
тест сүлжээнд баталжуулсан бол true байна.
##### isUniversity нь 
их сургуулийн диплом үед true байна.
