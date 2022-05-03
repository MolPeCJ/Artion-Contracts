### Описание

Этот репозиторий содержит дополненный проект "Artion-Contracts" от Fantom-foundation. 
Все скрипты деплоя были изменены. Также были добавлены скрипты верификации

***

### Схема взаимодействия смарт-контрактов

![](https://ipfs.io/ipfs/QmPcong3UfkoxAtD4mGvAGtEsNwndtAYH5uAyfkqoPumAL?filename=Fantom_new.png)

### deploy_all.js

#### Порядок деплоя:  

Artion ->  
ProxyAdmin ->  
AdminUpgradeabilityProxy ->  
FantomMarketplace ->  
FantomBundleMarketplace ->  
? FantomBundleMarketPlaceProxy ->  
FantomAuction ->  
? AuctionProxy ->  
FantomNFTFactory ->  
FantomNFTFactoryPrivate ->  
FantomNFTTradable ->  
FantomNFTTradablePrivate ->  
FantomTokenRegistry ->  
FantomAddressRegistry ->  
FantomPriceFeed ->  
FantomArtTradable -> 
FantomArtTradablePrivate ->  
FantomArtFactory ->  
FantomArtFactoryPrivate

#### | Artion
Юзер может минтить, сжигать токены erc-721 и проверять их существование по id.  За операции
взимается комиссия, устанавливаемся владельцем и переводимая по указанному адресу

#### | ProxyAdmin
Администратор прокси-сервера, отвечает за его обновление и передачу другому администратору

#### | AdminUpgradeabilityProxy
Сочетание функционала прокси-сервера и механзима обновления, расширенная версия ProxyAdmin

#### | FantomMarketplace
Контракт-маркетплейса erc-721/erc-1155, где юзер может купить или разместить предмет на продажу,  
отменить или изменить объявление за желаемые токены.  
Также есть особые оферы с оплатой только в  erc-20, ограниченные по времени, c роялти

#### | FantomBundleMarketplace
Контракт-маркетплейса erc-721/erc-1155 с возможностью купить или разместить на продажу связку (bundle) NFT.  
Тоже есть особые оферы с оплатой в желаемом erc-20, ограниченные по времени

// #### | FantomBundleMarketPlaceProxy ?

#### | FantomAuction
Контракт-аукцион, владелец токена erc-721 может выставить его в качестве лота, а также отменить в любой момент отменить его.  
Участник аукциона не может купить предмет ниже пороговой стоимости

// #### | AuctionProxy ?

#### | FantomNFTFactory
"Фабрика" по созданию erc-721 формата FantomNFTTradable с первоначальной возможностью их использования в указанных фабрикой аукционе,  
маркетплейсе и бандл-маркетплейсе. Далее юзер может изменять данные  

#### | FantomNFTFactoryPrivate
"Фабрика" по созданию erc-721 формата FantomNFTTradablePrivate с теми же возможностями, что и FantomNFTFactory

#### | FantomNFTTradable
Контракт erc-721, cоздается через FantomNFTFactory. Юзер может изменить: address _auction, address _marketplace, address _bundleMarketplace,  
uint256 _platformFee, address payable _feeReceipient. То есть, все данные

#### | FantomNFTTradablePrivate
Контракт erc-721, cоздается через FantomNFTFactoryPrivate. Чеканить erc-721 может только  
владелец, что и оправдывает название контракта 

#### | FantomTokenRegistry
Контракт с методами добавления/удаления возможных к оплате токенов erc-20

#### | FantomAddressRegistry
Контракт регистрации адресов основных контрактов

#### | FantomPriceFeed
Контракт с ораклом для получения актуальных цен токенов erc-20

#### | FantomArtTradable
Контракт erc-1155, cоздается через FantomArtFactory. Юзер может чеканить токены erc-1155 по желаемым адресу/количеству/URI

#### | FantomArtTradablePrivate
Контракт erc-1155, cоздается через FantomArtFactoryPrivate. Чеканить erc-721 может только  
владелец, как и в FantomNFTTradablePrivate

#### | FantomArtFactory
"Фабрика" по созданию erc-1155 формата FantomArtTradable

#### | FantomArtFactoryPrivate
"Фабрика" по созданию erc-1155 формата FantomArtTradablePrivate. По аналогии с FantomNFTFactory и FantomNFTFactoryPrivate