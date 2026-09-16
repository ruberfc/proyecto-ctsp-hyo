export enum SqlDataType {
    // String Types
    CHAR = 'CHAR',
    VARCHAR = 'VARCHAR',
    TEXT = 'TEXT',
    MEDIUMTEXT = 'MEDIUMTEXT',
    LONGTEXT = 'LONGTEXT',
    TINYTEXT = 'TINYTEXT',
    
    // Numeric Types
    TINYINT = 'TINYINT',
    SMALLINT = 'SMALLINT',
    MEDIUMINT = 'MEDIUMINT',
    INT = 'INT',
    BIGINT = 'BIGINT',
    FLOAT = 'FLOAT',
    DOUBLE = 'DOUBLE',
    DECIMAL = 'DECIMAL',
    
    // Date and Time Types
    DATE = 'DATE',
    TIME = 'TIME',
    DATETIME = 'DATETIME',
    TIMESTAMP = 'TIMESTAMP',
    YEAR = 'YEAR',
    
    // Binary Types
    BINARY = 'BINARY',
    VARBINARY = 'VARBINARY',
    BLOB = 'BLOB',
    MEDIUMBLOB = 'MEDIUMBLOB',
    LONGBLOB = 'LONGBLOB',
    TINYBLOB = 'TINYBLOB',
    
    // Other Types
    BOOLEAN = 'BOOLEAN',
    JSON = 'JSON',
    ENUM = 'ENUM',
    SET = 'SET'
} 