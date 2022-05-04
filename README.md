### Описание

Этот репозиторий содержит дополненный проект "Artion-Contracts" от Fantom-foundation. 
Все скрипты деплоя были изменены. Также были добавлены скрипты верификации.

***

### Схема взаимодействия смарт-контрактов

![](https://ipfs.io/ipfs/QmPcong3UfkoxAtD4mGvAGtEsNwndtAYH5uAyfkqoPumAL?filename=Fantom_new.png)

### deploy_all.js

#### Порядок деплоя:  

Artion ->  
ProxyAdmin ->  
AdminUpgradeabilityProxy ->  
FantomMarketplace ->  
FantomMarketplaceProxy ->  
FantomBundleMarketplace ->  
FantomBundleMarketPlaceProxy ->  
FantomAuction ->  
AuctionProxy ->  
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
Юзер может минтить, сжигать токены erc-721 и проверять их существование по id. За операции
взимается комиссия, устанавливаемая владельцем контракта и переводимая по указанному им адресу.

#### | ProxyAdmin
Администратор прокси. Позволяет получить актуальные имплементацию и адрес администратора, а также изменить их.

#### | AdminUpgradeabilityProxy
Сочетание функционала прокси и механизма обновления, расширенная версия ProxyAdmin.

#### | FantomMarketplace
Контракт-маркетплейса erc-721/erc-1155, где юзер может купить или разместить предмет на продажу за доступный платформой токен erc-20, отменить или изменить объявление.  
Возможно выставление запланированной продажи.  
Также есть возможность выставить оффер о продаже, ограниченный по времени.  
При желании как и erc-721, так и erc-1155 можно добавить роялти в токене Artion.

#### | FantomBundleMarketplace
Контракт-маркетплейса erc-721/erc-1155 с возможностью купить или разместить на продажу связку (bundle) NFT за один из токенов erc-20. Возможно выставление запланированной продажи.  
Также есть возможность выставить оффер о продаже, ограниченный по времени.

#### | FantomAuction
Контракт-аукцион, владелец токена erc-721 может выставить его в качестве лота, а также отменить в любой момент отменить его. Аукцион ограничен по времени. Участник аукциона не может купить предмет ниже пороговой стоимости.

#### | FantomNFTFactory
"Фабрика" по созданию erc-721 формата FantomNFTTradable.

#### | FantomNFTFactoryPrivate
"Фабрика" по созданию erc-721 формата FantomNFTTradablePrivate с теми же возможностями, что и FantomNFTFactory.

#### | FantomNFTTradable
Контракт erc-721, cоздается через FantomNFTFactory. 

#### | FantomNFTTradablePrivate
Контракт erc-721, cоздается через FantomNFTFactoryPrivate. Чеканить erc-721 может только  
владелец, что и оправдывает название контракта. В остальном схож с FantomNFTTradable.

#### | FantomTokenRegistry
Контракт с методами добавления/удаления возможных к оплате токенов erc-20.

#### | FantomAddressRegistry
Контракт регистрации адресов основных контрактов.

#### | FantomPriceFeed
Контракт с ораклом для получения актуальных цен токенов erc-20.

#### | FantomArtTradable
Контракт erc-1155, cоздается через FantomArtFactory. Юзер может чеканить токены erc-1155 по желаемым адресу/количеству/URI.

#### | FantomArtTradablePrivate
Контракт erc-1155, cоздается через FantomArtFactoryPrivate. Чеканить erc-721 может только  
владелец, как и в FantomNFTTradablePrivate.

#### | FantomArtFactory
"Фабрика" по созданию erc-1155 формата FantomArtTradable.

#### | FantomArtFactoryPrivate
"Фабрика" по созданию erc-1155 формата FantomArtTradablePrivate.  
По аналогии с FantomNFTFactory и FantomNFTFactoryPrivate.