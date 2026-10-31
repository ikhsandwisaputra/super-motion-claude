---
source: https://developer.chrome.com/docs/css-ui/scroll-driven-animations
title: "Animate elements on scroll with Scroll-driven animations  |  CSS and UI  |  Chrome for Developers"
fetched: 2026-10-28
---

* [Home](https://developer.chrome.com/)
* [Docs](https://developer.chrome.com/docs)
* [CSS and UI](https://developer.chrome.com/docs/css-ui)

# Animate elements on scroll with Scroll-driven animations Stay organized with collections Save and categorize content based on your preferences.

Learn how to work with Scroll Timelines and View Timelines to create scroll-driven animations in a declarative way.

![Bramus](https://web.dev/images/authors/bramus.jpg)

Bramus

Published: May 5, 2023

## Scroll-driven animations

Browser Support

* ![Chrome: 115.](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='-10 -10 276 276'%3E%3ClinearGradient id='a' x1='145' x2='34' y1='253' y2='61' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%231e8e3e'/%3E%3Cstop offset='1' stop-color='%2334a853'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='111' x2='222' y1='254' y2='62' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23fcc934'/%3E%3Cstop offset='1' stop-color='%23fbbc04'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' x1='17' x2='239' y1='80' y2='80' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23d93025'/%3E%3Cstop offset='1' stop-color='%23ea4335'/%3E%3C/linearGradient%3E%3Ccircle cx='128' cy='128' r='64' fill='%23fff'/%3E%3Cpath fill='url(%23a)' d='M96 183a64 64 0 0 1-23-23L17 64a128 128 0 0 0 111 192l55-96a64 64 0 0 1-87 23Z'/%3E%3Cpath fill='url(%23b)' d='M192 128a64 64 0 0 1-9 32l-55 96A128 128 0 0 0 239 64H128a64 64 0 0 1 64 64Z'/%3E%3Ccircle cx='128' cy='128' r='52' fill='%231a73e8'/%3E%3Cpath fill='url(%23c)' d='M96 73a64 64 0 0 1 32-9h111a128 128 0 0 0-222 0l56 96a64 64 0 0 1 23-87Z'/%3E%3C/svg%3E)

  115
* ![Edge: 115.](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='0 0 27600 27600'%3E%3ClinearGradient id='A' gradientUnits='userSpaceOnUse'/%3E%3ClinearGradient id='B' x1='6870' x2='24704' y1='18705' y2='18705' xlink:href='%23A'%3E%3Cstop offset='0' stop-color='%230c59a4'/%3E%3Cstop offset='1' stop-color='%23114a8b'/%3E%3C/linearGradient%3E%3ClinearGradient id='C' x1='16272' x2='5133' y1='10968' y2='23102' xlink:href='%23A'%3E%3Cstop offset='0' stop-color='%231b9de2'/%3E%3Cstop offset='.16' stop-color='%231595df'/%3E%3Cstop offset='.67' stop-color='%230680d7'/%3E%3Cstop offset='1' stop-color='%230078d4'/%3E%3C/linearGradient%3E%3CradialGradient id='D' cx='16720' cy='18747' r='9538' xlink:href='%23A'%3E%3Cstop offset='.72' stop-opacity='0'/%3E%3Cstop offset='.95' stop-opacity='.53'/%3E%3Cstop offset='1'/%3E%3C/radialGradient%3E%3CradialGradient id='E' cx='7130' cy='19866' r='14324' gradientTransform='matrix(.14843 -.98892 .79688 .1196 -8759 25542)' xlink:href='%23A'%3E%3Cstop offset='.76' stop-opacity='0'/%3E%3Cstop offset='.95' stop-opacity='.5'/%3E%3Cstop offset='1'/%3E%3C/radialGradient%3E%3CradialGradient id='F' cx='2523' cy='4680' r='20243' gradientTransform='matrix(-.03715 .99931 -2.12836 -.07913 13579 3530)' xlink:href='%23A'%3E%3Cstop offset='0' stop-color='%2335c1f1'/%3E%3Cstop offset='.11' stop-color='%2334c1ed'/%3E%3Cstop offset='.23' stop-color='%232fc2df'/%3E%3Cstop offset='.31' stop-color='%232bc3d2'/%3E%3Cstop offset='.67' stop-color='%2336c752'/%3E%3C/radialGradient%3E%3CradialGradient id='G' cx='24247' cy='7758' r='9734' gradientTransform='matrix(.28109 .95968 -.78353 .22949 24510 -16292)' xlink:href='%23A'%3E%3Cstop offset='0' stop-color='%2366eb6e'/%3E%3Cstop offset='1' stop-color='%2366eb6e' stop-opacity='0'/%3E%3C/radialGradient%3E%3Cpath id='H' d='M24105 20053a9345 9345 0 01-1053 472 10202 10202 0 01-3590 646c-4732 0-8855-3255-8855-7432 0-1175 680-2193 1643-2729-4280 180-5380 4640-5380 7253 0 7387 6810 8137 8276 8137 791 0 1984-230 2704-456l130-44a12834 12834 0 006660-5282c220-350-168-757-535-565z'/%3E%3Cpath id='I' d='M11571 25141a7913 7913 0 01-2273-2137 8145 8145 0 01-1514-4740 8093 8093 0 013093-6395 8082 8082 0 011373-859c312-148 846-414 1554-404a3236 3236 0 012569 1297 3184 3184 0 01636 1866c0-21 2446-7960-8005-7960-4390 0-8004 4166-8004 7820 0 2319 538 4170 1212 5604a12833 12833 0 007684 6757 12795 12795 0 003908 610c1414 0 2774-233 4045-656a7575 7575 0 01-6278-803z'/%3E%3Cpath id='J' d='M16231 15886c-80 105-330 250-330 566 0 260 170 512 472 723 1438 1003 4149 868 4156 868a5954 5954 0 003027-839 6147 6147 0 001133-850 6180 6180 0 001910-4437c26-2242-796-3732-1133-4392-2120-4141-6694-6525-11668-6525-7011 0-12703 5635-12798 12620 47-3654 3679-6605 7996-6605 350 0 2346 34 4200 1007 1634 858 2490 1894 3086 2921 618 1067 728 2415 728 2952s-271 1333-780 1990z'/%3E%3Cuse fill='url(%23B)' xlink:href='%23H'/%3E%3Cuse fill='url(%23D)' opacity='.35' xlink:href='%23H'/%3E%3Cuse fill='url(%23C)' xlink:href='%23I'/%3E%3Cuse fill='url(%23E)' opacity='.4' xlink:href='%23I'/%3E%3Cuse fill='url(%23F)' xlink:href='%23J'/%3E%3Cuse fill='url(%23G)' xlink:href='%23J'/%3E%3C/svg%3E)

  115
* ![Firefox Technology Preview: supported.](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 512 512'%3E%3Cdefs%3E%3CradialGradient id='ff-b' cx='428.5' cy='55.1' r='501' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23ffbd4f'/%3E%3Cstop offset='.2' stop-color='%23ffac31'/%3E%3Cstop offset='.3' stop-color='%23ff9d17'/%3E%3Cstop offset='.3' stop-color='%23ff980e'/%3E%3Cstop offset='.4' stop-color='%23ff563b'/%3E%3Cstop offset='.5' stop-color='%23ff3750'/%3E%3Cstop offset='.7' stop-color='%23f5156c'/%3E%3Cstop offset='.8' stop-color='%23eb0878'/%3E%3Cstop offset='.9' stop-color='%23e50080'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-c' cx='245.4' cy='259.9' r='501' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.3' stop-color='%23960e18'/%3E%3Cstop offset='.3' stop-color='%23b11927' stop-opacity='.7'/%3E%3Cstop offset='.4' stop-color='%23db293d' stop-opacity='.3'/%3E%3Cstop offset='.5' stop-color='%23f5334b' stop-opacity='.1'/%3E%3Cstop offset='.5' stop-color='%23ff3750' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-d' cx='305.8' cy='-58.6' r='363' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.3' stop-color='%23ffdc3e'/%3E%3Cstop offset='.5' stop-color='%23ff9d12'/%3E%3Cstop offset='.5' stop-color='%23ff980e'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-e' cx='190' cy='390.8' r='238.6' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.3' stop-color='%233a8ee6'/%3E%3Cstop offset='.5' stop-color='%235c79f0'/%3E%3Cstop offset='.7' stop-color='%239059ff'/%3E%3Cstop offset='1' stop-color='%23c139e6'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-f' cx='252.2' cy='201.3' r='126.5' gradientTransform='matrix(1 0 0 1 -48 31)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.2' stop-color='%239059ff' stop-opacity='0'/%3E%3Cstop offset='.3' stop-color='%238c4ff3' stop-opacity='.1'/%3E%3Cstop offset='.8' stop-color='%237716a8' stop-opacity='.5'/%3E%3Cstop offset='1' stop-color='%236e008b' stop-opacity='.6'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-g' cx='239.1' cy='34.6' r='171.6' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffe226'/%3E%3Cstop offset='.1' stop-color='%23ffdb27'/%3E%3Cstop offset='.3' stop-color='%23ffc82a'/%3E%3Cstop offset='.5' stop-color='%23ffa930'/%3E%3Cstop offset='.7' stop-color='%23ff7e37'/%3E%3Cstop offset='.8' stop-color='%23ff7139'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-h' cx='374' cy='-74.3' r='732.2' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.5' stop-color='%23ff980e'/%3E%3Cstop offset='.6' stop-color='%23ff5634'/%3E%3Cstop offset='.7' stop-color='%23ff3647'/%3E%3Cstop offset='.9' stop-color='%23e31587'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-i' cx='304.6' cy='7.1' r='536.4' gradientTransform='rotate(84 303 4)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23fff44f'/%3E%3Cstop offset='.1' stop-color='%23ffe847'/%3E%3Cstop offset='.2' stop-color='%23ffc830'/%3E%3Cstop offset='.3' stop-color='%23ff980e'/%3E%3Cstop offset='.4' stop-color='%23ff8b16'/%3E%3Cstop offset='.5' stop-color='%23ff672a'/%3E%3Cstop offset='.6' stop-color='%23ff3647'/%3E%3Cstop offset='.7' stop-color='%23e31587'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-j' cx='235' cy='98.1' r='457.1' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.5' stop-color='%23ff980e'/%3E%3Cstop offset='.6' stop-color='%23ff5634'/%3E%3Cstop offset='.7' stop-color='%23ff3647'/%3E%3Cstop offset='.9' stop-color='%23e31587'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-k' cx='355.7' cy='124.9' r='500.3' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.2' stop-color='%23ffe141'/%3E%3Cstop offset='.5' stop-color='%23ffaf1e'/%3E%3Cstop offset='.6' stop-color='%23ff980e'/%3E%3C/radialGradient%3E%3ClinearGradient id='ff-a' x1='446.9' y1='76.8' x2='47.9' y2='461.8' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.1' stop-color='%23ffe847'/%3E%3Cstop offset='.2' stop-color='%23ffc830'/%3E%3Cstop offset='.4' stop-color='%23ff980e'/%3E%3Cstop offset='.4' stop-color='%23ff8b16'/%3E%3Cstop offset='.5' stop-color='%23ff672a'/%3E%3Cstop offset='.5' stop-color='%23ff3647'/%3E%3Cstop offset='.7' stop-color='%23e31587'/%3E%3C/linearGradient%3E%3ClinearGradient id='ff-l' x1='442.1' y1='74.8' x2='102.6' y2='414.3' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.2' stop-color='%23fff44f' stop-opacity='.8'/%3E%3Cstop offset='.3' stop-color='%23fff44f' stop-opacity='.6'/%3E%3Cstop offset='.5' stop-color='%23fff44f' stop-opacity='.2'/%3E%3Cstop offset='.6' stop-color='%23fff44f' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M479 166c-11-25-32-52-49-60a249 249 0 0 1 25 73c-27-68-73-95-111-155a255 255 0 0 1-8-14 44 44 0 0 1-4-9 1 1 0 0 0 0-1 1 1 0 0 0-1 0c-60 35-81 101-83 134a120 120 0 0 0-66 25 71 71 0 0 0-6-5 111 111 0 0 1-1-58c-25 11-44 29-58 44-9-12-9-52-8-60l-8 4a175 175 0 0 0-24 21 210 210 0 0 0-22 26 203 203 0 0 0-32 73l-1 2-2 15a229 229 0 0 0-4 34v1a240 240 0 0 0 477 40l1-9c5-41 0-84-15-121zM202 355l3 1-3-1zm55-145zm198-31z' fill='url(%23ff-a)'/%3E%3Cpath d='M479 166c-11-25-32-52-49-60 14 26 22 53 25 72v1a207 207 0 0 1-206 279c-113-3-212-87-231-197-3-17 0-26 2-40-2 11-3 14-4 34v1a240 240 0 0 0 477 40l1-9c5-41 0-84-15-121z' fill='url(%23ff-b)'/%3E%3Cpath d='M479 166c-11-25-32-52-49-60 14 26 22 53 25 72v1a207 207 0 0 1-206 279c-113-3-212-87-231-197-3-17 0-26 2-40-2 11-3 14-4 34v1a240 240 0 0 0 477 40l1-9c5-41 0-84-15-121z' fill='url(%23ff-c)'/%3E%3Cpath d='m362 195 1 1a130 130 0 0 0-22-29C266 92 322 5 331 0c-60 35-81 101-83 134l9-1c45 0 84 25 105 62z' fill='url(%23ff-d)'/%3E%3Cpath d='M257 210c-1 6-22 26-29 26-68 0-80 41-80 41 3 35 28 64 57 79l4 2 7 3a107 107 0 0 0 31 6c120 6 143-143 57-186 22-4 45 5 58 14-21-37-60-62-105-62l-9 1a120 120 0 0 0-66 25l17 16c16 16 58 33 58 35z' fill='url(%23ff-e)'/%3E%3Cpath d='M257 210c-1 6-22 26-29 26-68 0-80 41-80 41 3 35 28 64 57 79l4 2 7 3a107 107 0 0 0 31 6c120 6 143-143 57-186 22-4 45 5 58 14-21-37-60-62-105-62l-9 1a120 120 0 0 0-66 25l17 16c16 16 58 33 58 35z' fill='url(%23ff-f)'/%3E%3Cpath d='m171 151 5 3a111 111 0 0 1-1-58c-25 11-44 29-58 44 1 0 36 0 54 11z' fill='url(%23ff-g)'/%3E%3Cpath d='M18 261a242 242 0 0 0 231 197 207 207 0 0 0 206-279c8 56-20 110-64 146-86 71-169 43-186 31l-3-1c-50-24-71-70-67-110-42 0-57-35-57-35s38-28 89-4c46 22 90 4 90 4 0-2-42-19-58-35l-17-16a71 71 0 0 0-6-5l-5-3c-18-11-52-11-54-11-9-12-9-51-8-60l-8 4a175 175 0 0 0-24 21 210 210 0 0 0-22 26 203 203 0 0 0-32 73c0 1-9 38-5 57z' fill='url(%23ff-h)'/%3E%3Cpath d='M341 167a130 130 0 0 1 22 29 46 46 0 0 1 4 3c55 50 26 121 24 126 44-36 72-90 64-146-27-68-73-95-111-155a255 255 0 0 1-8-14 44 44 0 0 1-4-9 1 1 0 0 0 0-1 1 1 0 0 0-1 0c-9 5-65 92 10 167z' fill='url(%23ff-i)'/%3E%3Cpath d='M367 199a46 46 0 0 0-4-3l-1-1c-13-9-36-18-58-15 86 44 63 193-57 187a107 107 0 0 1-31-6 131 131 0 0 1-11-5c17 12 99 39 186-31 2-5 31-76-24-126z' fill='url(%23ff-j)'/%3E%3Cpath d='M148 277s12-41 80-41c7 0 28-20 29-26s-44 18-90-4c-51-24-89 4-89 4s15 35 57 35c-4 40 16 85 67 110l3 1c-29-15-54-44-57-79z' fill='url(%23ff-k)'/%3E%3Cpath d='M479 166c-11-25-32-52-49-60a249 249 0 0 1 25 73c-27-68-73-95-111-155a255 255 0 0 1-8-14 44 44 0 0 1-4-9 1 1 0 0 0 0-1 1 1 0 0 0-1 0c-60 35-81 101-83 134l9-1c45 0 84 25 105 62-13-9-36-18-58-14 86 43 63 192-57 186a107 107 0 0 1-31-6 131 131 0 0 1-11-5l-3-1 3 1c-29-15-54-44-57-79 0 0 12-41 80-41 7 0 28-20 29-26 0-2-42-19-58-35l-17-16a71 71 0 0 0-6-5 111 111 0 0 1-1-58c-25 11-44 29-58 44-9-12-9-52-8-60l-8 4a175 175 0 0 0-24 21 210 210 0 0 0-22 26 203 203 0 0 0-32 73l-1 2-2 15a279 279 0 0 0-4 34v1a240 240 0 0 0 477 40l1-9c5-41 0-84-15-121zm-24 13z' fill='url(%23ff-l)'/%3E%3C/svg%3E)

  ![](data:image/svg+xml,%3Csvg width='18' height='12' viewBox='0 0 18 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 9.5C9.97222 9.5 10.7986 9.15972 11.4792 8.47917C12.1597 7.79861 12.5 6.97222 12.5 6C12.5 5.02778 12.1597 4.20139 11.4792 3.52083C10.7986 2.84028 9.97222 2.5 9 2.5C8.02778 2.5 7.20139 2.84028 6.52083 3.52083C5.84028 4.20139 5.5 5.02778 5.5 6C5.5 6.97222 5.84028 7.79861 6.52083 8.47917C7.20139 9.15972 8.02778 9.5 9 9.5ZM9 8C8.44444 8 7.97222 7.80556 7.58333 7.41667C7.19444 7.02778 7 6.55556 7 6C7 5.44444 7.19444 4.97222 7.58333 4.58333C7.97222 4.19444 8.44444 4 9 4C9.55556 4 10.0278 4.19444 10.4167 4.58333C10.8056 4.97222 11 5.44444 11 6C11 6.55556 10.8056 7.02778 10.4167 7.41667C10.0278 7.80556 9.55556 8 9 8ZM9 12C7.0195 12 5.21535 11.4549 3.58754 10.3646C1.95974 9.27431 0.763889 7.81944 0 6C0.763889 4.18056 1.95974 2.72569 3.58754 1.63542C5.21535 0.545139 7.0195 0 9 0C10.9805 0 12.7847 0.545139 14.4125 1.63542C16.0403 2.72569 17.2361 4.18056 18 6C17.2361 7.81944 16.0403 9.27431 14.4125 10.3646C12.7847 11.4549 10.9805 12 9 12ZM9 10.5C10.5556 10.5 11.9931 10.0972 13.3125 9.29167C14.6319 8.48611 15.6458 7.38889 16.3542 6C15.6458 4.61111 14.6319 3.51389 13.3125 2.70833C11.9931 1.90278 10.5556 1.5 9 1.5C7.44444 1.5 6.00694 1.90278 4.6875 2.70833C3.36806 3.51389 2.35417 4.61111 1.64583 6C2.35417 7.38889 3.36806 8.48611 4.6875 9.29167C6.00694 10.0972 7.44444 10.5 9 10.5Z' fill='%23F29900'/%3E%3C/svg%3E%0A)
* ![Safari: 26.](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='195 190 135 135'%3E%3Cdefs%3E%3ClinearGradient id='s-a' x1='132.6' x2='134.4' y1='111.7' y2='-105.3' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-color='%23d2d2d2' /%3E%3Cstop offset='.5' stop-color='%23f2f2f2' /%3E%3Cstop offset='1' stop-color='%23fff' /%3E%3C/linearGradient%3E%3ClinearGradient id='s-b' gradientUnits='userSpaceOnUse' /%3E%3ClinearGradient id='s-c' x1='65.4' x2='67.4' y1='115.7' y2='17.1' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-color='%23005ad5' /%3E%3Cstop offset='.2' stop-color='%230875f0' /%3E%3Cstop offset='.3' stop-color='%23218cee' /%3E%3Cstop offset='.6' stop-color='%2327a5f3' /%3E%3Cstop offset='.8' stop-color='%2325aaf2' /%3E%3Cstop offset='1' stop-color='%2321aaef' /%3E%3C/linearGradient%3E%3ClinearGradient id='s-d' x1='158.7' x2='176.3' y1='96.7' y2='79.5' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-color='%23c72e24' /%3E%3Cstop offset='1' stop-color='%23fd3b2f' /%3E%3C/linearGradient%3E%3CradialGradient id='s-i' cx='-69.9' cy='69.3' r='54' gradientTransform='matrix(.9 -.01 .04 2.72 -9 -120)' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-color='%2324a5f3' stop-opacity='0' /%3E%3Cstop offset='1' stop-color='%231e8ceb' /%3E%3C/radialGradient%3E%3CradialGradient id='s-j' cx='109.3' cy='13.8' r='93.1' gradientTransform='matrix(-.02 1.1 -1.04 -.02 137 -115)' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-opacity='0' /%3E%3Cstop offset='1' stop-color='%235488d6' stop-opacity='0' /%3E%3Cstop offset='1' stop-color='%235d96eb' /%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='220' height='220' x='22' y='-107' fill='url(%23s-a)' ry='49' transform='matrix(.57 0 0 .57 187 256)' /%3E%3Cg transform='translate(194 190)'%3E%3Ccircle cx='67.8' cy='67.7' fill='url(%23s-c)' paint-order='stroke fill markers' r='54' /%3E%3Ccircle cx='-69.9' cy='69.3' fill='url(%23s-i)' transform='translate(138 -2)' r='54' /%3E%3C/g%3E%3Cellipse cx='120' cy='14.2' fill='url(%23s-j)' rx='93.1' ry='93.7' transform='matrix(.58 0 0 .58 192 250)' /%3E%3Cg transform='matrix(.58 0 0 .57 197 182)'%3E%3Cpath fill='%23cac7c8' d='M46 192h1l72-48-7-9-66 57Z' /%3E%3Cpath fill='%23fbfffc' d='M46 191v1l66-57-7-9-59 65Z' /%3E%3Cpath fill='url(%23s-d)' d='m119 144-7-9 66-57-59 66Z' /%3E%3Cpath fill='%23fb645c' d='m105 126 7 9 66-57-1-1-72 49Z' /%3E%3C/g%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-miterlimit='1' stroke-width='1.3' d='m287 278 3-2m-12-17 8-2m-8-3h4m-4-13 8 2m-8 3h4m-1-13 7 3m-4-11 7 4m-2-11 6 6m0-12 6 7m1-11 4 6m4-10 3 7m5-9 2 7m15-7-1 7m10-5-3 7m11-4-4 7m11-2-5 6m16 7-7 4m10 4-7 3m10 6-8 1m8 16-8-2m5 10-7-3m4 11-7-4m2 11-6-5m0 11-5-6m-2 11-4-7m-4 11-3-8m-6 10-1-8m-16 8 2-8m-10 5 3-7m-11 4 4-7m-11 2 5-6m-8 3 3-3m4 8 2-3m5 8 2-4m6 7 1-4m8 5v-4m8 4v-4m9 3-1-4m9 1-2-4m9 0-2-4m9-2-3-3m8-4-3-2m8-5-4-2m7-6-4-1m5-8h-4m4-8h-4m3-9-4 1m1-9-4 2m-1-9-3 2m-2-9-3 3m-4-8-2 3m-5-8-2 4m-6-6-1 3m-8-5v4m-8-4v4m-9-2 1 3m-9 0 2 3m-9 1 2 3m-9 2 3 3m-8 4 3 2m-8 5 4 2m-7 6 4 1m-4 25 4-1m-2 5 7-3m-6 7 4-2m-2 6 7-4m-13-21h8m41-41v-8m0 99v-8m49-42h-8' transform='translate(-65 8)' /%3E%3C/svg%3E)

  26

[Source](https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/animation-timeline)

Scroll-driven animations are a common UX pattern on the web. A scroll-driven animation is linked to the scroll position of a scroll container. This means that as you scroll up or down, the linked animation scrubs forward or backward in direct response. Examples of this are effects such as parallax background images or reading indicators which move as you scroll.

[  ](/static/docs/css-ui/scroll-driven-animations/video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/HiTavHlNjHFrA3NLLDZq.mp4)

A reading indicator atop a document, driven by scroll.

A similar type of scroll-driven animation is an animation that is linked to an element's position within its scroll container. With it, for example, elements can fade-in as they come into view.

[  ](/static/docs/css-ui/scroll-driven-animations/video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/eV0R7BXHO7ieTFVBfTEE.mp4)

The images on this page fade-in as they come into view.

The classic way to achieve these kinds of effects is to respond to scroll events on [the main thread](https://developer.mozilla.org/docs/Glossary/Main_thread), which leads to two main problems:

* Modern browsers perform scrolling on a separate process and therefore deliver scroll events asynchronously.
* Main thread animations are [subject to jank](https://developer.chrome.com/blog/inside-browser-part3#updating_rendering_pipeline_is_costly).

This makes creating performant scroll-driven animations that are in-sync with scrolling impossible or very difficult.

From Chrome version 115 there is a new set of APIs and concepts that you can use to enable declarative scroll-driven animations: Scroll Timelines and View Timelines.

These new concepts integrate with the existing [Web Animations API (WAAPI)](https://drafts.csswg.org/web-animations-1/) and [CSS Animations API](https://drafts.csswg.org/css-animations-1/), allowing them to inherit the advantages these existing APIs bring. That includes the ability to have scroll-driven animations run off the main thread. Yes, read that correctly: you can now have silky smooth animations, driven by scroll, running off the main thread, with just a few lines of extra code. What's not to like?!

## Animations on the web, a small recap

### Animations on the web with CSS

To create an animation in CSS, define a set of keyframes using the `@keyframes` at-rule. Link it up to an element using the `animation-name` property while also setting an `animation-duration` to determine how long the animation should take. There are more `animation-*` longhand properties available–`animation-easing-function` and `animation-fill-mode` just to name a few–which can all be combined in the `animation` shorthand.

For example, here’s an animation that scales up an element on the X-axis while also changing its background color:

```
@keyframes scale-up {
  from {
    background-color: red;
    transform: scaleX(0);
  }
  to {
    background-color: darkred;
    transform: scaleX(1);
  }
}

#progressbar {
  animation: 2.5s linear forwards scale-up;
}
```

### Animations on the web with JavaScript

In JavaScript, the Web Animations API can be used to achieve exactly the same. You can do this by either creating new `Animation` and `KeyFrameEffect` instances, or use the much shorter [`Element` `animate()` method](https://developer.mozilla.org/docs/Web/API/Element/animate).

```
document.querySelector('#progressbar').animate(
  {
    backgroundColor: ['red', 'darkred'],
    transform: ['scaleX(0)', 'scaleX(1)'],
  },
  {
    duration: 2500,
    fill: 'forwards',
    easing: 'linear',
   }
);
```

This visual result of the JavaScript snippet above is identical to the previous CSS version.

## Animation timelines

By default, an animation attached to an element runs on the [document timeline](https://developer.mozilla.org/docs/Web/API/DocumentTimeline). Its origin time starts at 0 when the page loads, and starts ticking forwards as clock time progresses. This is the default animation timeline and, until now, was the only animation timeline you had access to.

The [Scroll-driven Animations Specification](https://drafts.csswg.org/scroll-animations-1/) defines two new types of timelines that you can use:

* **Scroll Progress Timeline**: a timeline that is linked to the scroll position of a scroll container along a particular axis.
* **View Progress Timeline**: a timeline that is linked to the relative position of a particular element within its scroll container.

### Scroll Progress Timeline

A Scroll Progress Timeline is an animation timeline that is linked to progress in the scroll position of a scroll container–also called *scrollport* or *scroller*–along a particular axis. It converts a position in a scroll range into a percentage of progress.

The starting scroll position represents 0% progress and the ending scroll position represents 100% progress. In the following visualization, you can see that the progress counts up from 0% to 100% as you scroll the scroller from top to bottom.

[  ](/static/docs/css-ui/scroll-driven-animations/video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/xdU4YJ6cxjNYpec1XcE6.mp4)

Visualization of a Scroll Progress Timeline. As you scroll down to the bottom of the scroller, the progress value counts up from 0% to 100%.

✨ Try it for yourself

A Scroll Progress Timeline is often abbreviated to simply “Scroll Timeline”.

### View Progress Timeline

This type of timeline is linked to the relative progress of a particular element within a scroll container. Just like a Scroll Progress Timeline, a scroller’s scroll offset is tracked. Unlike a Scroll Progress Timeline, it’s the relative position of a subject within that scroller that determines the progress.

This is somewhat comparable to how [`IntersectionObserver`](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API) works, which can track how much an element is visible in the scroller. If the element is not visible in the scroller, it is not intersecting. If it is visible inside the scroller–even for the smallest part–it is intersecting.

A View Progress Timeline begins from the moment a subject starts intersecting with the scroller and ends when the subject stops intersecting the scroller. In the following visualization, you can see that the progress starts counting up from 0% when the subject enters the scroll container and reaches 100% at the very moment the subject has left the scroll container.

[  ](/static/docs/css-ui/scroll-driven-animations/video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/rvPTFW2277KBTuWiZFj1.mp4)

Visualization of a View Progress Timeline. The progress counts up from 0% to 100% as the subject (green box) crosses the scroller.

✨ Try it for yourself

A View Progress Timeline is often abbreviated to simply “View Timeline”. It is possible to target specific parts of a View Timeline based on the subject’s size, but more on that later.

## Getting practical with Scroll Progress Timelines

### Creating an anonymous Scroll Progress Timeline in CSS

The easiest way to create a Scroll Timeline in CSS is to use the `scroll()` function. This creates an anonymous Scroll Timeline that you can set as the value for the new `animation-timeline` property.

Example:

```
@keyframes animate-it { … }

.subject {
  animation: animate-it linear;
  animation-timeline: scroll(root block);
}
```

The `scroll()` function accepts a `<scroller>` and an `<axis>` argument.

Accepted values for the `<scroller>` argument are the following:

* `nearest`: Uses the nearest ancestor scroll container *(default)*.
* `root`: Uses the document viewport as the scroll container.
* `self`: Uses the element itself as the scroll container.

Accepted values for the `<axis>` argument are the following:

* `block`: Uses the measure of progress along the block axis of the scroll container *(default)*.
* `inline`: Uses the measure of progress along the inline axis of the scroll container.
* `y`: Uses the measure of progress along the y axis of the scroll container.
* `x`: Uses the measure of progress along the x axis of the scroll container.

For example, to bind an animation to the root scroller on the block axis, the values to pass into `scroll()` are `root` and `block`. Put together, the value is `scroll(root block)`.

#### Demo: Reading progress indicator

This demo has a reading progress indicator fixed to the top of the viewport. As you scroll down the page, the progress bar grows until it takes up the full viewport width upon reaching the end of the document. An anonymous Scroll Progress Timeline is used to drive the animation.

[  ](/static/docs/css-ui/scroll-driven-animations/video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/HiTavHlNjHFrA3NLLDZq.mp4)

Demo: [Reading progress indicator](https://scroll-driven-animations.style/demos/progress-bar/css/scroll-defaults.html).

✨ Try it for yourself

The reading progress indicator is positioned at the top of the page using position fixed. To leverage composited animations, not the `width` is being animated but the element is scaled down on the x-axis using a `transform`.

```
<body>
  <div id="progress"></div>
  …
</body>
```

```
@keyframes grow-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

#progress {
  position: fixed;
  left: 0; top: 0;
  width: 100%; height: 1em;
  background: red;

  transform-origin: 0 50%;
  animation: grow-progress auto linear;
  animation-timeline: scroll();
}
```

The timeline for the animation `grow-progress` on the `#progress` element is set to an anonymous timeline that’s created using `scroll()`. No arguments are given to `scroll()` so it will fall back to its default values.

The default scroller to track is the `nearest` one, and the default axis is `block`. This effectively targets the root scroller as that is the nearest scroller of the `#progress` element, while tracking its block direction.

### Creating a named Scroll Progress Timeline in CSS

An alternative way to define a Scroll Progress Timeline is to use a named one. It’s a bit more verbose, but it can come in handy when you aren’t targeting a parent scroller or the root scroller, or when the page uses multiple timelines or when automatic lookups don’t work. This way, you can identify a Scroll Progress Timeline by the name that you give it.

To create a named Scroll Progress Timeline on an element, set the `scroll-timeline-name` CSS property on the scroll container to an identifier of your liking. The value must start with `--`.

To tweak which axis to track, also declare the `scroll-timeline-axis` property. Allowed values are the same as the `<axis>` argument of `scroll()`.

Finally, to link the animation to the Scroll Progress Timeline, set the `animation-timeline` property on the element that needs to be animated to the same value as the identifier used for the `scroll-timeline-name`.

Code Example:

```
@keyframes animate-it { … }

.scroller {
  scroll-timeline-name: --my-scroller;
  scroll-timeline-axis: inline;
}

.scroller .subject {
  animation: animate-it linear;
  animation-timeline: --my-scroller;
}
```

If wanted, you can combine `scroll-timeline-name` and `scroll-timeline-axis` in the `scroll-timeline` shorthand. For example:

```
scroll-timeline: --my-scroller inline;
```

#### Demo: Horizontal carousel step indicator

This demo features a step indicator shown above each image carousel. When a carousel contains three images, the indicator bar starts at 33% width to indicate you are currently looking at image one of three. When the last image is in view–determined by the scroller having scrolled to the end–the indicator takes up the full width of the scroller. A named Scroll Progress Timeline is used to drive the animation.

[  ](/static/docs/css-ui/scroll-driven-animations/video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/5ln4aDkZ625xlM9jZXPl.mp4)

Demo: [Horizontal carousel step indicator](https://scroll-driven-animations.style/demos/horizontal-carousel/css/).

✨ Try it for yourself

The base markup for a gallery is this:

```
<div class="gallery" style="--num-images: 2;">
  <div class="gallery__scrollcontainer">
    <div class="gallery__progress"></div>
    <div class="gallery__entry">…</div>
    <div class="gallery__entry">…</div>
  </div>
</div>
```

The `.gallery__progress` element is absolutely positioned within the `.gallery` wrapper element. Its initial size is determined by the `--num-images` custom property.

```
.gallery {
  position: relative;
}

.gallery__progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1em;
  transform: scaleX(calc(1 / var(--num-images)));
}
```

The `.gallery__scrollcontainer` lays out the contained `.gallery__entry` elements horizontally and is the element that scrolls. By tracking its scroll position, the `.gallery__progress` gets animated. This is done by referring to the named Scroll Progress Timeline `--gallery__scrollcontainer`.

```
@keyframes grow-progress {
  to { transform: scaleX(1); }
}

.gallery__scrollcontainer {
  overflow-x: scroll;
  scroll-timeline: --gallery__scrollcontainer inline;
}
.gallery__progress {
  animation: auto grow-progress linear forwards;
  animation-timeline: --gallery__scrollcontainer;
}
```

### Creating a Scroll Progress Timeline with JavaScript

To create a Scroll Timeline in JavaScript, create a new instance of the `ScrollTimeline` class. Pass in a property bag with the `source` and `axis` that you want to track.

* `source`: A reference to the element whose scroller that you want to track. Use `document.documentElement` to target the root scroller.
* `axis`: Determines which axis to track. Similar to the CSS variant, accepted values are `block`, `inline`, `x`, and `y`.

```
const tl = new ScrollTimeline({
  source: document.documentElement,
});
```

To attach it to a Web Animation, pass it in as the `timeline` property and omit any `duration` if there was any.

```
$el.animate({
  opacity: [0, 1],
}, {
  timeline: tl,
});
```

#### Demo: Reading progress indicator, revisited

To recreate the reading progress indicator with JavaScript, while using the same markup, use the following JavaScript code:

```
const $progressbar = document.querySelector('#progress');

$progressbar.style.transformOrigin = '0% 50%';
$progressbar.animate(
  {
    transform: ['scaleX(0)', 'scaleX(1)'],
  },
  {
    fill: 'forwards',
    timeline: new ScrollTimeline({
      source: document.documentElement,
    }),
  }
);
```

The visual result is identical in the CSS version: the created `timeline` tracks the root scroller and scale the `#progress` up on the x-axis from 0% to 100% as you scroll the page.

✨ Try it for yourself

## Getting practical with View Progress Timeline

### Creating an Anonymous View Progress Timeline in CSS

To create a View Progress Timeline, use the `view()` function. Its accepted arguments are `<axis>` and `<view-timeline-inset>`.

* The `<axis>` is the same as from the Scroll Progress Timeline and defines which axis to track. The default value is `block`.
* With `<view-timeline-inset>`, you can specify an offset *(positive or negative)* to adjust the bounds when an element is considered to be in view or not. The value must be a percentage or `auto`, with `auto` being the default value.

For example, to bind an animation to an element intersecting with its scroller on the block axis, use `view(block)`. Similar to `scroll()`, set this as the value for the `animation-timeline` property and don’t forget to set the `animation-duration` to `auto`.

Using the following code, every `img` will fade-in as it crosses the viewport while you scroll.

```
@keyframes reveal {
  from { opacity: 0; }
  to { opacity: 1; }
}

img {
  animation: reveal linear;
  animation-timeline: view();
}
```

### Intermezzo: View Timeline ranges

By default, an animation linked to the View Timeline attaches to the entire timeline range. This starts from the moment the subject is about to enter the scrollport and ends when the subject has left the scrollport entirely.

It is also possible to link it to a specific part of the View Timeline by specifying the range that it should attach to. This can be, for example, only when the subject is entering the scroller. In the following visualization, the progress starts counting up from 0% when the subject enters the scroll container but already reaches 100% from the moment it is entirely intersecting.

[  ](/static/docs/css-ui/scroll-driven-animations/video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/p952qt9FVzv2v3zP0o9Q.mp4)

A View Timeline set to track the entry range of the subject. The animation only runs while the subject is entering the scrollport.

The possible View Timeline ranges that you can target are the following:

* `cover`: Represents the full range of the view progress timeline.
* `entry`: Represents the range during which the principal box is entering the view progress visibility range.
* `exit`: Represents the range during which the principal box is exiting the view progress visibility range.
* `entry-crossing`: Represents the range during which the principal box crosses the end border edge.
* `exit-crossing`: Represents the range during which the principal box crosses the start border edge.
* `contain`: Represents the range during which the principal box is either fully contained by, or fully covers, its view progress visibility range within the scrollport. This depends on whether the subject is taller or shorter than the scroller.

To define a range, you must set a range-start and range-end. Each consists of range-name *(see list above)* and a range-offset to determine the position within that range-name. The range-offset is typically a percentage ranging from `0%` to `100%` but you can also specify a fixed length such as `20em`.

For example, if you want to run an animation from the moment a subject enters, choose `entry 0%` as the range-start. To have it finished by the time the subject has entered, choose `entry 100%` as a value for the range-end.

In CSS, you set this using the `animation-range` property. Example:

```
animation-range: entry 0% entry 100%;
```

In JavaScript, use the `rangeStart` and `rangeEnd` properties.

```
$el.animate(
  keyframes,
  {
    timeline: tl,
    rangeStart: 'entry 0%',
    rangeEnd: 'entry 100%',
  }
);
```

Use the tool embedded below to see what each range-name represents and how the percentages affect the start and end positions. Try to set the range-start to `entry 0%` and the range-end to `cover 50%`, and then drag the scrollbar to see the animation result.

The View Timeline Ranges Visualizer, available at <https://goo.gle/view-timeline-range-tool>

Watch a recording
[  ](/static/docs/css-ui/scroll-driven-animations/video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/x6SLvlnns26zNGeJOCuS.mp4)

As you might notice while playing around with this View Timeline Ranges tools, some ranges can be targeted by two different range-name + range-offset combinations. For example, `entry 0%`, `entry-crossing 0%`, and `cover 0%` all target the same area.

When the range-start and range-end target the same range-name and span the entire range–from 0% up to 100%–you can shorten the value to simply the range name. For example, `animation-range: entry 0% entry 100%;` can be rewritten to the much shorter `animation-range: entry`.

#### Demo: Image reveal

This demo fades in the images as they enter the scrollport. This is done using an Anonymous View Timeline. The animation range has been tweaked so that each image is at full opacity when it is halfway the scroller.

[  ](/static/docs/css-ui/scroll-driven-animations/video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/eV0R7BXHO7ieTFVBfTEE.mp4)

Demo: [Image reveal](https://scroll-driven-animations.style/demos/image-reveal/css/anonymous.html)

✨ Try it for yourself

The expanding effect is achieved by using a clip-path that is animated. The CSS used for this effect is this:

```
@keyframes reveal {
  from { opacity: 0; clip-path: inset(0% 60% 0% 50%); }
  to { opacity: 1; clip-path: inset(0% 0% 0% 0%); }
}

.revealing-image {
  animation: auto linear reveal both;
  animation-timeline: view();
  animation-range: entry 25% cover 50%;
}
```

### Creating a named View Progress Timeline in CSS

Similar to how Scroll Timelines have named versions, you can also create named View Timelines. Instead of the `scroll-timeline-*` properties you use variants that carry the `view-timeline-` prefix, namely `view-timeline-name` and `view-timeline-axis`.

The same type of values apply, and the same rules for looking up a named timeline apply.

#### Demo: Image reveal, revisited

Reworking the image reveal demo from earlier, the revised code looks like this:

```
.revealing-image {
  view-timeline-name: --revealing-image;
  view-timeline-axis: block;

  animation: auto linear reveal both;
  animation-timeline: --revealing-image;
  animation-range: entry 25% cover 50%;
}
```

Using `view-timeline-name: revealing-image`, the element will be tracked within its nearest scroller. The same value is then used as the value for the `animation-timeline` property. The visual output is exactly the same as before.

✨ Try it for yourself

### Creating a View Progress Timeline in JavaScript

To create a View Timeline in JavaScript, create a new instance of the `ViewTimeline` class. Pass in a property bag with the `subject` that you want to track, `axis`, and `inset`.

* `subject`: A reference to the element that you want to track within its own scroller.
* `axis`: The axis to track. Similar to the CSS variant, accepted values are `block`, `inline`, `x`, and `y`.
* `inset`: An inset *(positive)* or outset *(negative)* adjustment of the scrollport when determining whether the box is in view.

```
const tl = new ViewTimeline({
  subject: document.getElementById('subject'),
});
```

To attach it to a Web Animation, pass it in as the `timeline` property and omit any `duration` if there was any. Optionally, pass in range information using the `rangeStart` and `rangeEnd` properties.

```
$el.animate({
  opacity: [0, 1],
}, {
  timeline: tl,
  rangeStart: 'entry 25%',
  rangeEnd: 'cover 50%',
});
```

✨ Try it for yourself

## More things to try out

### Attaching to multiple View Timeline ranges with one set of keyframes

Let’s take a look at this contact list demo where the list entries are animated. As a list entry enters the scrollport from the bottom it slides+fades in, and as it exits the scrollport at the top it slides+fades out.

[  ](/static/docs/css-ui/scroll-driven-animations/video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/edztzaUNSuQsUVUzF9vr.mp4)

Demo: [Contact list](https://scroll-driven-animations.style/demos/contact-list/css/multiple-animations.html)

✨ Try it for yourself

For this demo, each element gets decorated with one View Timeline that tracks the element as it crosses its scrollport yet two scroll-driven animations are attached to it. The `animate-in` animation is attached to the `entry` range of the timeline, and the `animate-out` animation to the `exit` range of the timeline.

```
@keyframes animate-in {
  0% { opacity: 0; transform: translateY(100%); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes animate-out {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-100%); }
}

#list-view li {
  animation: animate-in linear forwards,
             animate-out linear forwards;
  animation-timeline: view();
  animation-range: entry, exit;
}
```

Instead of running two different animations attached to two different ranges, it is also possible to create one set of keyframes that already contains the range information.

```
@keyframes animate-in-and-out {
  entry 0%  {
    opacity: 0; transform: translateY(100%);
  }
  entry 100%  {
    opacity: 1; transform: translateY(0);
  }
  exit 0% {
    opacity: 1; transform: translateY(0);
  }
  exit 100% {
    opacity: 0; transform: translateY(-100%);
  }
}

#list-view li {
  animation: linear animate-in-and-out;
  animation-timeline: view();
}
```

As the keyframes contain the range information, you don’t need to specify the `animation-range`. The result is exactly the same as it was before.

✨ Try it for yourself

### Attaching to a non-ancestor Scroll Timeline

The lookup mechanism for named Scroll Timelines and named View Timelines is limited to scroll ancestors only. Very often though, the element that needs to be animated is not a child of the scroller that needs to be tracked.

To make this work, the `timeline-scope` property comes into play. You use this property to declare a timeline with that name without actually creating it. This gives the timeline with that name a broader scope. In practice, you use the `timeline-scope` property on a shared parent element so that a child scroller’s timeline can attach to it.

For example:

```
.parent {
  timeline-scope: --tl;
}
.parent .scroller {
  scroll-timeline: --tl;
}
.parent .scroller ~ .subject {
  animation: animate linear;
  animation-timeline: --tl;
}
```

In this snippet:

* The `.parent` element declares a timeline with the name `--tl`. Any child of it can find and use it as a value for the `animation-timeline` property.
* The `.scroller` element actually defines a Scroll Timeline with the name `--tl`. By default it would only be visible to its children but because `.parent` has it set as the `scroll-timeline-root`, it attaches to it.
* The `.subject` element uses the `--tl` timeline. It walks up its ancestor tree and finds `--tl` on the `.parent`. With the `--tl` on the `.parent` pointing to the `--tl` of `.scroller`, the `.subject` will essentially track the `.scroller`’s Scroll Progress Timeline.

Put differently, you can use `timeline-root` to move a timeline up to an ancestor (aka *hoisting*), so that all children of the ancestor can access it.

The `timeline-scope` property can be used with both both Scroll Timelines and View Timelines.

## More demos and resources

All demos covered in this article on [the scroll-driven-animations.style mini-site](https://scroll-driven-animations.style/). The website includes many more demos to highlight what is possible with Scroll-driven animations.

One of the additional demos is this list of album covers. Each cover rotates in 3D as it takes the center spotlight.

[  ](/static/docs/css-ui/scroll-driven-animations/video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/hiItR1vueBVTJbgOAwHp.mp4)

Demo: [Cover Flow](https://scroll-driven-animations.style/demos/cover-flow/css/)

✨ Try it for yourself

Or this stacking cards demo that leverage `position: sticky`. As the cards stack, the already stuck cards scale down, creating a nice depth effect. In the end, the entire stack slides out of view as a group.

[  ](/static/docs/css-ui/scroll-driven-animations/video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/dyy4rOs0WsWOAuxS9sBG.mp4)

Demo: [Stacking cards](https://scroll-driven-animations.style/demos/stacking-cards/css/).

✨ Try it for yourself

Also featured on [scroll-driven-animations.style](https://scroll-driven-animations.style/) is a collection of tools such as the View Timeline Range Progress visualization that was included earlier in this post.

Scroll-driven animations are also covered in [What’s new in Web Animations](https://io.google/2023/program/170b44dc-47f0-409f-92fe-b5c70aab4569/) at Google I/O ’23.
