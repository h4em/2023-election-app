# 2023-election-app

> Full-stack web app that visualizes the votes distribution of the 2023 Polish parliamentary election.

https://github.com/h4em/2023-election-data-analysis/assets/72524655/c69d7ce7-9199-4547-8ac5-ae9a73ac736a?width=1080&height=600

## About 
This repo showcases a simple web-app project I've made on the side. It's all about visualising the 2023 Parliamentary election data available @[wybory.gov.pl/sejmsenat2023/](https://wybory.gov.pl/sejmsenat2023/pl/dane_w_arkuszach).

## Features 
<!-- <p>
    image source: https://github.com/marwin1991/profile-technology-icons
    https://simpleicons.org/?q=connector
</p> -->

## Tech used
<p align="center">
  <img src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" alt="HTML" width="48" height="48" style="margin-right: 16px;">
  <img src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" alt="CSS" width="48" height="48" style="margin-right: 16px;">
  <img src="https://user-images.githubusercontent.com/25181517/183898054-b3d693d4-dafb-4808-a509-bab54cf5de34.png" alt="Bootstrap" width="48" height="48" style="margin-right: 16px;">
  <img src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="JavaScript" width="48" height="48" style="margin-right: 16px;">
  <img src="res\jquery.svg" alt="JavaScript" width="48" height="48" 
  style="margin-right: 16px;">
  <img src="res\chartjs.png" alt="chartjs" width="48" height="48" 
  style="margin-right: 16px;">
  <img src="res\leafletjs.png" alt="leaflet" width="48" height="48" 
  style="margin-right: 16px;">
  <img src="https://user-images.githubusercontent.com/25181517/183423507-c056a6f9-1ba8-4312-a350-19bcbc5a8697.png" alt="Python" width="48" height="48" style="margin-right: 16px;">
  <img src="https://user-images.githubusercontent.com/25181517/183423775-2276e25d-d43d-4e58-890b-edbc88e915f7.png" alt="Flask" width="48" height="48" style="margin-right: 16px;">
  <img src="res\pandas.svg" alt="pandas" width="48" height="48" 
  style="margin-right: 16px;">
  <img src="res\sqlalchemy.svg" alt="sqlalchemy" width="48" height="48" 
  style="margin-right: 16px;">
  <img src="https://user-images.githubusercontent.com/25181517/183896128-ec99105a-ec1a-4d85-b08b-1aa1620b2046.png" alt="MySQL" width="48" height="48" style="margin-right: 16px;">
  <img src="https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png" alt="Docker" width="48" height="48">  
</p>

## Data integrity
It would be a damn shame if lookup was to produce false results, so i ran some tests. I can't guarantee they're 100% correct, but for the majority of cases the data should check out.
<p align="center">
  <img src="res/res-comp-wwa.png" alt="wwa" height="512px">
  <img src="res/res-comp-sowin.png" alt="sowin" height="512px">
</p>

## Entity relationship diagram
<p align="center">
  <img src="res/entity-relationship-diagram.png" alt="erd" height="512px">
</p>

## Notes
Some things worth mentioning:
- Data from **abroad** / **ships** was ***excluded***.
