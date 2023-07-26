export interface SignUp{
    name:String,
    password:string,
    email:string
}

export interface Login{
    email:string,
    password:string
}

export interface product{
    name:string,
    price:number,
    color:string,
    category:string,
    discription:string,
    Url:string,
    id:number,
    quantity: undefined|number
}

export interface cart{
    name:string,
    price:number,
    color:string,
    category:string,
    discription:string,
    Url:string,
    id:number,
    quantity: undefined|number,
    userId:number,
    productId:number|undefined

}