/*
 * Copyright 2018 Alexey Lavrenchenko (http://alavrenchenko.com/). All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

CREATE DATABASE personal_website CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE personal_website;

CREATE TABLE contact_messages (
Id INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
Name VARCHAR(256) NOT NULL,
Email VARCHAR(1024) NOT NULL,
Message LONGTEXT NOT NULL,
CreatedDateTime DATETIME(3) NULL,
CreatedDateTimeTicks BIGINT NULL,
Ip VARCHAR(128) NULL,
UserAgent VARCHAR(1024) NULL,

PRIMARY KEY(Id)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;