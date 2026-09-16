import { SqlDataType } from './SqlDataType';

export interface SqlParameter {
    name?: string;
    value: any;
    type?: SqlDataType;
    isOutput?: boolean;
    direction?: 'IN' | 'OUT' | 'INOUT';
}

export interface SubQuery {
    query: string;
    alias: string;
    params?: SqlParameter[];
}

export interface JoinClause {
    type: 'INNER' | 'LEFT' | 'RIGHT' | 'FULL' | 'CROSS' | 'NATURAL';
    table: string;
    on?: string;
    using?: string[];
}

export interface QueryBuilder {
    select: string[];
    from: string;
    joins?: JoinClause[];
    where?: string;
    orderBy?: string;
    groupBy?: string;
    having?: string;
    limit?: number;
    offset?: number;
    forUpdate?: boolean;
    lockInShareMode?: boolean;
    distinct?: boolean;
    union?: {
        type: 'UNION' | 'UNION ALL';
        query: string;
        params?: SqlParameter[];
    }[];
}

export interface TransactionQuery {
    query: string;
    params?: SqlParameter[];
    timeout?: number;
}
