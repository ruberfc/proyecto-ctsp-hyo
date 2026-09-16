import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { SqlDataType } from './interface/SqlDataType';
import { DataSource } from 'typeorm';


@Injectable()
export class DatabaseService {
    constructor(@InjectDataSource() private dataSource: DataSource) { }

    async execQuery<T>(query: string, params?: Array<{
        value: any,
        type?: SqlDataType;
    }>): Promise<T[]> {
        try {
            if (params && params.length > 0) {
                let modifiedQuery = query;
                
                params.forEach((param) => {
                    const paramValue = this.formatParameter(param.value, param.type);
                    modifiedQuery = modifiedQuery.replace('?', paramValue);
                });

                return await this.dataSource.query(modifiedQuery);
            }
            return await this.dataSource.query(query);
        } catch (error) {
            throw new Error(`Database query error: ${error.message}`);
        }
    }

    async execSP<T>(procName: string, params?: Array<{
        value: any,
        type?: SqlDataType;
    }>): Promise<T[]> {
        try {
            let execQuery = `CALL ${procName}`;
            
            if (params && params.length > 0) {
                execQuery += '(';
                const paramValues = params.map(param => 
                    this.formatParameter(param.value, param.type)
                );
                execQuery += paramValues.join(', ') + ')';
            }
    
            return await this.dataSource.query(execQuery);
        } catch (error) {
            throw new Error(`Stored procedure execution error: ${error.message}`);
        }
    }

    private formatParameter(value: any, type?: SqlDataType): string {
        if (value === null || value === undefined) {
            return 'NULL';
        }

        switch (type) {
            // Tipos numéricos
            case SqlDataType.TINYINT:
            case SqlDataType.SMALLINT:
            case SqlDataType.MEDIUMINT:
            case SqlDataType.INT:
            case SqlDataType.BIGINT:
                if (!Number.isInteger(value)) {
                    throw new Error(`Value ${value} must be an integer`);
                }
                return value.toString();

            case SqlDataType.DECIMAL:
            case SqlDataType.FLOAT:
            case SqlDataType.DOUBLE:
                if (typeof value !== 'number') {
                    throw new Error(`Value ${value} must be a number`);
                }
                return value.toString();

            // Tipos de fecha y hora
            case SqlDataType.DATETIME:
            case SqlDataType.TIMESTAMP:
                if (value instanceof Date) {
                    return `'${value.toISOString().slice(0, 19).replace('T', ' ')}'`;
                }
                throw new Error(`Value ${value} must be a Date`);

            case SqlDataType.DATE:
                if (value instanceof Date) {
                    return `'${value.toISOString().split('T')[0]}'`;
                }
                throw new Error(`Value ${value} must be a Date`);

            case SqlDataType.TIME:
                if (value instanceof Date) {
                    return `'${value.toISOString().split('T')[1].slice(0, 8)}'`;
                }
                throw new Error(`Value ${value} must be a Date`);

            // Tipos de texto
            case SqlDataType.CHAR:
                return `'${this.escapeString(value.toString()).substring(0, 1)}'`;

            case SqlDataType.VARCHAR:
            case SqlDataType.TEXT:
            case SqlDataType.MEDIUMTEXT:
            case SqlDataType.LONGTEXT:
            case SqlDataType.TINYTEXT:
                return `'${this.escapeString(value.toString())}'`;

            // Tipos binarios
            case SqlDataType.BOOLEAN:
                return value ? '1' : '0';

            case SqlDataType.BINARY:
            case SqlDataType.VARBINARY:
            case SqlDataType.BLOB:
            case SqlDataType.MEDIUMBLOB:
            case SqlDataType.LONGBLOB:
            case SqlDataType.TINYBLOB:
                return `0x${Buffer.from(value).toString('hex')}`;

            // Caso por defecto (tratarlo como VARCHAR)
            default:
                if (typeof value === 'string') {
                    return `'${this.escapeString(value)}'`;
                }
                if (typeof value === 'number') {
                    return value.toString();
                }
                if (value instanceof Date) {
                    return `'${value.toISOString().slice(0, 19).replace('T', ' ')}'`;
                }
                if (typeof value === 'boolean') {
                    return value ? '1' : '0';
                }
                return `'${this.escapeString(value.toString())}'`;
        }
    }

    private escapeString(str: string): string {
        return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, char => {
            switch (char) {
                case "\0":
                    return "\\0";
                case "\x08":
                    return "\\b";
                case "\x09":
                    return "\\t";
                case "\x1a":
                    return "\\z";
                case "\n":
                    return "\\n";
                case "\r":
                    return "\\r";
                case "\"":
                case "'":
                case "\\":
                case "%":
                    return "\\" + char;
                default:
                    return char;
            }
        });
    }

}
