import type { SortBy as SortBy_Migrants } from "@/components/data/Migrants/SortBy";
import type { SortBy as SortBy_Stays } from "@/components/data/Stays/SortBy"
import type { SortBy as SortBy_Shelters } from "@/components/data/Shelters/SortBy"
import type { SortBy as SortBy_Stock } from "@/components/data/Stock/SortBy"
import type { SortBy as SortBy_Transactions } from "@/components/data/Transactions/SortBy"
import type { SortOrder } from "@/models/SortOrder"
import type Shelter from "../models/Shelter";
import moment from 'moment'

export function getMigrantsFilteringParams() {
    const params = new URLSearchParams(window.location.search);
    const res: { searchString: string, nationality: string, sortBy: SortBy_Migrants, sortOrder: SortOrder } = {
        searchString: params.get("q")?.toString() ?? "",
        nationality: params.get("nat")?.toString() ?? "",
        sortBy: (params.get("sort")?.toString() as SortBy_Migrants) ?? "id",
        sortOrder: (params.get("ord")?.toString() as SortOrder) ?? "asc"
    }
    return res
}

export function filterMigrantsData(migrants: any) {
    const { searchString, nationality, sortBy, sortOrder } = getMigrantsFilteringParams()
    let filteredData = [...migrants]
    // Filtering data
    filteredData = nationality ? filteredData.filter(data => data.nationality.toLowerCase() === nationality.toLowerCase()) : filteredData
    // sorting data
    filteredData = filteredData.sort((a, b) => {
        const A = a[sortBy].toString().toLowerCase()
        const B = b[sortBy].toString().toLowerCase()
        if (A > B) return sortOrder === 'asc' ? 1 : -1
        if (A < B) return sortOrder === 'asc' ? -1 : 1
        return 0
    })
    // searchingData
    filteredData = searchString ? filteredData.filter(data => {
        const fullname = `${data.name.toLowerCase()} ${data.lastname.toLowerCase()}`
        return fullname.includes(searchString.toLowerCase())
    }) : filteredData
    return filteredData
}

export function getStaysFilteringParams() {
    const params = new URLSearchParams(window.location.search);
    const res: { searchString: string, nationality: string, sortBy: SortBy_Stays, sortOrder: SortOrder, from: string, to: string } = {
        searchString: params.get("q")?.toString() ?? "",
        nationality: params.get("nat")?.toString() ?? "",
        sortBy: (params.get("sort")?.toString() as SortBy_Stays) ?? "arrivalDate",
        sortOrder: (params.get("ord")?.toString() as SortOrder) ?? "desc",
        from: (params.get("from")?.toString()) ?? "",
        to: (params.get("to")?.toString()) ?? "",
    }
    return res
}

export function filterStaysData(stays: any) {
    const { searchString, nationality, sortBy, sortOrder, from, to } = getStaysFilteringParams()
    let filteredData = [...stays]
    // Filtering data
    // --- by date
    filteredData = from ? filteredData.filter(data => {
        const endOfFrom = moment(from).endOf('day')
        return moment(data.created_at).isAfter(endOfFrom)
    }) : filteredData
    filteredData = to ? filteredData.filter(data => {
        const endOfTo = moment(to).endOf('day')
        return moment(data.created_at).isBefore(endOfTo)
    }) : filteredData
    // --- by nationality
    filteredData = nationality ? filteredData.filter(data => data.nationality.toLowerCase() === nationality.toLowerCase()) : filteredData
    // sorting data
    filteredData = filteredData.sort((a, b) => {
        const A = sortBy !== "arrivalDate" ? a[sortBy].toString().toLowerCase() : new Date(a[sortBy]).getTime()
        const B = sortBy !== "arrivalDate" ? b[sortBy].toString().toLowerCase() : new Date(b[sortBy]).getTime()
        if (A > B) return sortOrder === 'asc' ? 1 : -1
        if (A < B) return sortOrder === 'asc' ? -1 : 1
        return 0
    })
    // searchingData
    filteredData = searchString ? filteredData.filter(data => {
        const fullname = `${data.name.toLowerCase()} ${data.lastname.toLowerCase()}`
        return fullname.includes(searchString.toLowerCase())
    }) : filteredData
    return filteredData
}

export function getSheltersFilteringParams() {
    const params = new URLSearchParams(window.location.search);
    const res: { searchString: string, state: string, city: string, sortBy: SortBy_Shelters, sortOrder: SortOrder, from: string, to: string } = {
        searchString: params.get("q")?.toString() ?? "",
        state: params.get("state")?.toString() ?? "",
        city: params.get("city")?.toString() ?? "",
        sortBy: (params.get("sort")?.toString() as SortBy_Shelters) ?? "created_at",
        sortOrder: (params.get("ord")?.toString() as SortOrder) ?? "desc",
        from: (params.get("from")?.toString()) ?? "",
        to: (params.get("to")?.toString()) ?? "",
    }
    return res
}

export function filterSheltersData(shelters: Shelter[]) {
    const { searchString, state, city, sortBy, sortOrder, from, to } = getSheltersFilteringParams()
    let filteredData = [...shelters]
    // Filtering data
    // --- by date
    filteredData = from ? filteredData.filter(data => {
        const endOfFrom = moment(from).endOf('day')
        return moment(data.created_at).isAfter(endOfFrom)
    }) : filteredData
    filteredData = to ? filteredData.filter(data => {
        const endOfTo = moment(to).endOf('day')
        return moment(data.created_at).isBefore(endOfTo)
    }) : filteredData
    // --- by location
    filteredData = state ? filteredData.filter(data => data.state.toLowerCase() === state.toLowerCase()) : filteredData
    filteredData = city ? filteredData.filter(data => data.city.toLowerCase() === city.toLowerCase()) : filteredData
    // sorting data
    filteredData = filteredData.sort((a: any, b: any) => {
        const A = sortBy !== "created_at" ? a[sortBy].toString().toLowerCase() : new Date(a[sortBy]).getTime()
        const B = sortBy !== "created_at" ? b[sortBy].toString().toLowerCase() : new Date(b[sortBy]).getTime()
        if (A > B) return sortOrder === 'asc' ? 1 : -1
        if (A < B) return sortOrder === 'asc' ? -1 : 1
        return 0
    })
    // searchingData
    filteredData = searchString ? filteredData.filter(data => {
        return data.organization_name.toLowerCase().includes(searchString.toLowerCase())
    }) : filteredData
    return filteredData
}

export function getStockFilteringParams() {
    const params = new URLSearchParams(window.location.search);
    const res: { searchString: string, category: string, sortBy: SortBy_Stock, sortOrder: SortOrder } = {
        searchString: params.get("q")?.toString() ?? "",
        category: params.get("category")?.toString() ?? "",
        sortBy: (params.get("sort")?.toString() as SortBy_Stock) ?? "id",
        sortOrder: (params.get("ord")?.toString() as SortOrder) ?? "asc",
    }
    return res
}

export function filterStockData(inventory: any) {
    const { searchString, category, sortBy, sortOrder } = getStockFilteringParams()
    let filteredData = [...inventory]
    // Filtering data
    filteredData = category ? filteredData.filter(data => data.category.toLowerCase() === category.toLowerCase()) : filteredData
    // sorting data
    filteredData = filteredData.sort((a: any, b: any) => {
        const A = isNaN(a[sortBy]) ? a[sortBy].toString().toLowerCase() : Number(a[sortBy])
        const B = isNaN(b[sortBy]) ? b[sortBy].toString().toLowerCase() : Number(b[sortBy])
        if (A > B) return sortOrder === 'asc' ? 1 : -1
        if (A < B) return sortOrder === 'asc' ? -1 : 1
        return 0
    })
    // searchingData
    filteredData = searchString ? filteredData.filter(data => {
        return data.name.toLowerCase().includes(searchString.toLowerCase())
    }) : filteredData
    return filteredData
}

export function getTransactionsFilteringParams() {
    const params = new URLSearchParams(window.location.search);
    const res: { searchString: string, category: string, type: string, signedBy: string, sortBy: SortBy_Transactions, sortOrder: SortOrder, from: string, to: string } = {
        searchString: params.get("q")?.toString() ?? "",
        category: params.get("category")?.toString() ?? "",
        type: params.get("type") ?? "",
        signedBy: params.get("signedBy") ?? "",
        sortBy: (params.get("sort")?.toString() as SortBy_Transactions) ?? "id",
        sortOrder: (params.get("ord")?.toString() as SortOrder) ?? "asc",
        from: (params.get("from")?.toString()) ?? "",
        to: (params.get("to")?.toString()) ?? "",
    }
    return res
}

export function filterTransactionsData(transactions: any) {
    const { searchString, category, type, signedBy, sortBy, sortOrder, from, to } = getTransactionsFilteringParams()
    let filteredData = [...transactions]
    // Filtering data
    // --- by date
    filteredData = from ? filteredData.filter(data => {
        const endOfFrom = moment(from).endOf('day')
        return moment(data.created_at).isAfter(endOfFrom)
    }) : filteredData
    filteredData = to ? filteredData.filter(data => {
        const endOfTo = moment(to).endOf('day')
        return moment(data.created_at).isBefore(endOfTo)
    }) : filteredData
    // --- by category
    filteredData = category ? filteredData.filter(data => data.category.toLowerCase() === category.toLowerCase()) : filteredData
    // --- by type
    filteredData = type ? filteredData.filter(data => type === 'income' ? data.income > 0 : !data.income) : filteredData
    // --- by signature
    filteredData = signedBy ? filteredData.filter(data => data.signedBy.toLowerCase() === signedBy.toLowerCase()) : filteredData
    // sorting data
    filteredData = filteredData.sort((a: any, b: any) => {
        const A = isNaN(a[sortBy]) ? a[sortBy].toString().toLowerCase() : Number(a[sortBy])
        const B = isNaN(b[sortBy]) ? b[sortBy].toString().toLowerCase() : Number(b[sortBy])
        if (A > B) return sortOrder === 'asc' ? 1 : -1
        if (A < B) return sortOrder === 'asc' ? -1 : 1
        return 0
    })
    // searchingData
    filteredData = searchString ? filteredData.filter(data => {
        return data.product.toLowerCase().includes(searchString.toLowerCase())
    }) : filteredData
    return filteredData
}