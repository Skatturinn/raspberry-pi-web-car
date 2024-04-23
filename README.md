## 19. mars 
Skilgreindum við verkefnið. Hugmyndin var að útbúa fjarstýrðan bíl. Honum er stjórnað í gegnum vefsíðu. Notandi getur stýrt honum með w, a, s og d.

## 9. Apríl 
Uppsetning á sd korti fyrir raspberry pi með node.js og git stuðningi. Repostofnað og tengt við skjal á raspberry pi. Þá er hægt að skrifa kóðan á heimatölvu í stað þess að opna hann i gegnum terminal í ssh tenginu við raspberry

## 10. Apríl
Byrjað var á notendaviðmótinu þannig að vefsíðan geti lesið innslátt á stýringu eftir því hvort noteandi ýti á w, a, s eða d. Serverinn var síðan settur upp. Hann var hluti af bakendum. Hlutverk hans er að taka á móti  upplýsingum framendans þ.e. Á hvaða takka notandinn ýtir á.



## 12. Apríl
Það sem gerist í framendanum er sent á bakendann. Útbúin er mynd sem birtist á vefsíðu og stilling samræmir það sem notandinn slær á lyklaborð og virkni síðunnar. Stór mynd sem birtist á vefsíðu með fyrrgreindum hnöppum birtist notanda. Notendaviðmótið var einnig gert skalanlegt.


![mynd af sidu](/myndafsidu2.jpg)



Mynd af bakenda að skila inputum á vefsíðu, hvaða takki er haldið inni
## 12. Apríl
Notendaviðmótið er fínpússað.


![mynd af sidu](/myndafsidu.jpg)



## 15. Apríl
Hleðslubanki var útvegaður.

## 17. Apríl
Síun á innslagi notenda er bætt við þ.e. Komið er í veg fyrir að hægt sé að ýta á tvo hnappa á sama tíma. Einnig var náð í rpi-gpi pakka sem gerir kleift að slökkva og kveikja á rassberry-pie  stýrirpinnum í java-script.

## 18. Apríl
Byrjað var á því að reyna að stýra stepper-mótor. Eftir 6 tilraunir tekst að snúa mótornum. Svo er byrjað að reyna að stýra dc-mótór og servo. Búið er til pwm signal sem rassberry zero w styður ekki. Prófað er servo mótorinn með því að tengja stýripinnann í volt. Mótorinn virkar en það gengur ekki að senda stýrimerki til mótorsins frá tölvunni. Eftir mikla erfiðleika tekst ekki að ná að stýra mótornum.

## 19. Apríl
Bíllinn er hannaður með hleðslubankann, steppermótor og servomótor í huga. Hann er teiknaður í solidworks.

![bill3](/bill3.jpg)

## 21. Apríl 
3d prentun.


![bill](/bill1.jpg)
![bill2](/bill2.jpg)


## 22. Apríl 
Reynt er að tengja stýrimerki frá vefsíðu að mótor í gegnum hotspot frá síma. Öxlar og tannhjól eru pússuð til. Bíllinn er að lokum settur saman. Bíllinn var kynntur en náði því miður ekki að keyra. Allt annað var klárt, en það sem vantaði var að ná að snúa mótornum í gegnum vefsíðu.


## Viðauki
Hægt að sjá allan kóða á repo:

https://github.com/Skatturinn/raspberry-pi-web-car

Hægt er að sækja kóðan á arduino með git skipun.
```
git clone https://github.com/Skatturinn/raspberry-pi-web-car.git
```
Til að keyra vefsíðu þarf að hafa Node.js 10+ uppsett á vélinni og keyra fyrst
```
npm install
```
Eftir það er hægt að kveikja á server sem skilar vefsíðu þegar gerð er beiðni í browser á ip tölu raspberrypi á port 3000 ,eð skipuninni.
```
npm run dev
```

Sýnt er ip tala tölvunar og port í command line þegar keyrð er skipun.

Ef repo er sótt og set upp á windows tölvu þarf að slökka á öllum pigpio notkunum í app.js skránni þar sem þær eru einungis nothæfar á linux.



Þá ætti vefsíðan að vera hýst og sína ip tölu sem er opin öðrum tölvum á wifi netinu
