
CREATE TABLE Users (
    ID serial primary key,
    passWd text not null, -- password 
    FirstName text not null,
    LastName text not null,
    Email text not null, -- We will use email address as login id.
    PhoneNumber text,
    DOB Date not null
);

CREATE TABLE Centres (
    Address text not null,
    ID serial primary key,
    UsageFee float
);

CREATE TABLE ClassSessions (
    ID serial primary key,
    weekDay integer not null, -- 0-6 : monday to sunday
    timeStarts time,
    location integer references Centres(ID),
    capacity integer
);

CREATE TABLE Tools (
    ToolType text,
    ImgSrc text,
    ID serial primary key,
    location integer references Centres(ID),
    RentingFee float
);

CREATE TABLE Bookings (
    UserID integer references Users(ID),
    SessID integer references ClassSessions(ID),
    ID serial primary key

);

CREATE TABLE Rents (
    ToolID integer references Tools(ID),
    UserID integer references Users(ID),
    Expiry Date not null,
    ID serial primary key
);
