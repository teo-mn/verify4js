export interface MetaDataInterface {
    issuer: {
        address: string,
        name: string,
    },
    blockchain: {
        network: string,
        smartContractAddress: string,
    },
    info: {
        additionalInfo: string,
        certNum: string,
        desc: string,
        name: string,
    },
    version: string,
    univ_meta?: {
        CONFER_YEAR_NAME?: string,
        DEGREE_NUMBER?: string,
        EDUCATION_FIELD_CODE?: string,
        EDUCATION_FIELD_NAME?: string,
        EDUCATION_LEVEL_NAME?: string,
        FIRST_NAME?: string,
        INSTITUTION_ID?: number,
        INSTITUTION_NAME?: string,
        LAST_NAME?: string,
        PRIMARY_IDENTIFIER_NUMBER?: string,
        TOTAL_GPA?: number,
    } & {
        [key: string]: string
    }
}

export interface VerifyResultInterface {
    state: 'REVOKED' | 'EXPIRED' | 'ISSUED' | 'APPROVE_PENDING' | 'INVALID',
    metadata: MetaDataInterface,
    cert: {},
    issuer: {isActive?: boolean},
    isTestnet: boolean,
    isUniversity?: boolean
}
