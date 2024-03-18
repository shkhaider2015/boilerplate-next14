import { NextRequest, NextResponse } from "next/server";

export async function GET() {

    try {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("Promise done")
                resolve('foo')
            }, 2000);
        })
        return NextResponse.json({
            message: 'Get Request Donw'
        }, { status: 200})
    } catch (error) {
       console.log("Error ", error);
       
    }
    
}

export async function POST(req:NextRequest) {
    
}