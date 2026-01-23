import os
from flask import Blueprint, request, make_response, send_file
from bson import ObjectId
from db import mongodb
import pandas as pd
import math

member_routes = Blueprint('/api/members', __name__)


@member_routes.route('/api/members/test', methods=['GET'])
def test_route():
    return {'Status': 'Ok', 'code': 200}


@member_routes.route('/api/members/getmembers', methods=['GET'])
def get_members():
    try:
        # results = mongodb.members.find()
        # print(results)
        #  Read query params
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))

        if page < 1:
            page = 1
        if limit < 1:
            limit = 10

        skip = (page - 1) * limit

        # Query MongoDB with pagination
        member_list = (
            mongodb.members
            .find()
            .sort("memberno", 1)   # important for consistent pagination
            .skip(skip)
            .limit(limit)
        )

        members = []
        for result in member_list:
            result['_id'] = str(result['_id'])
            members.append(result)

        total_records = mongodb.members.count_documents({})

        if len(members) > 0:
            return {"status": "Success", "msg": "Members found", "members": members, "pagination": {
                "page": page,
                "limit": limit,
                "totalRecords": total_records,
                "totalPages": math.ceil(total_records / limit)
            }}
        else:
            return {"status": "Failed", "msg": "No members found", "members": []}
        # return {"status": "In progress", "msg": "In progress"}
    except Exception as e:
        return {'status': 'Failed', 'msg': 'Something went wrong', 'error': str(e)}


@member_routes.route('/api/members/addmember', methods=['POST'])
def add_member():
    member_data = request.json['newMember']
    if member_data['memberno'] != 'xx' or member_data['memberno'] != 'XX':
        member_data['memberno'] = int(member_data['memberno'])
    # print(member_data)
    try:
        member_add = mongodb.members.insert_one(member_data)
        if member_add.acknowledged:
            member_data['_id'] = str(member_add.inserted_id)
            return {"status": "Success", "msg": "New member added successfully", "id": member_data['_id']}
        else:
            return {"status": "Failed", "msg": "Member not added"}
    # return {"status": "In progress", "msg": "In progress"}
    except Exception as e:
        return {"status": "Failed", "msg": "Someting went wrong, please try again later!", "error": str(e)}


@member_routes.route('/api/members/deletemember', methods=['DELETE'])
def delete_member():
    member_id = request.json['id']
    delete_mem = ObjectId(member_id)
    try:
        result = mongodb.members.delete_one({'_id': delete_mem})
        if result.acknowledged:
            return {"status": "Success", "msg": "Member deleted successfully"}
        else:
            return {"status": "Failed", "msg": "Member not deleted"}
        # return {"status": "In progress", "msg": "In progress"}
    except Exception as e:
        return {"status": "Failed", "msg": "Someting went wrong, please try again later!", "error": str(e)}


@member_routes.route('/api/members/updatemember', methods=['PUT'])
def update_member():
    data = request.json
    newData = data['newMemberDetails']
    memid = ObjectId(data['id'])
    # print(newData)
    # print(memid)
    try:
        memberUpdate = mongodb.members.find_one_and_update(
            {'_id': memid}, {'$set': newData})
        return {"status": "Success", "msg": "Member updated successfully"}
        # return {"status": "In progress", "msg": "In progress"}
    except Exception as e:
        return {"status": "Failed", "msg": "Someting went wrong, please try again later!", "error": str(e)}


@member_routes.route('/api/members/search', methods=['GET'])
def search_member():
    search_text = request.args.get('query')
    # print(type(search_text))

    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 10))

    if page < 1:
        page = 1
    if limit < 1:
        limit = 10

    skip = (page - 1) * limit

    try:
        if search_text.isdigit():
            search_text = int(search_text)
            search_result = (
                mongodb.members.find(
                {"memberno": search_text}
                )
                .sort("memberno", 1)
                .skip(skip)
                .limit(limit)
            )
        else:
            search_result = (
                mongodb.members.find(
                {"fullname": {"$regex": f".*{search_text}.*", "$options": "i"}}
            )
                .sort("memberno", 1)
                .skip(skip)
                .limit(limit)
            )
        search_found = []
        for result in search_result:
            result['_id'] = str(result['_id'])
            search_found.append(result)

        # print(search_found)
        if len(search_found) > 0:
            return {"status": "Success", "msg": "Members found", "members": search_found,

                    "pagination": {
                        "page": page,
                        "limit": limit,
                        "totalRecords": len(search_found),
                        "totalPages": math.ceil(len(search_found) / limit)
                    }}
        else:
            return {"status": "Failed", "msg": "No members found", "members": []}
        # return {"status": "In progress", "msg": "In progress"}
    except Exception as e:
        return {"status": "Failed", "msg": "Someting went wrong, please try again later!", "error": str(e)}


@member_routes.route('/api/members/export-excel', methods=['POST'])
def members_export():
    try:
        req_columns = request.json
        csv_cols = ['memberno', 'fullname']
        results = mongodb.members.find()

        members_data = []
        for result in results:
            result['_id'] = str(result['_id'])
            if result['membership'] == 'आश्रयदाते':
                result['membership'] = 'Patrons'
            elif result['membership'] == 'आजीव':
                result['membership'] = 'Lifetime'
            elif result['membership'] == 'हितचिंतक':
                result['membership'] = 'Well Wisher'

            if result['paymentmode'] == 'रोख':
                result['paymentmode'] = 'Cash'
            elif result['paymentmode'] == 'धनादेश':
                result['paymentmode'] = 'Cheque'

            if result['livingStatus'] == 'हयात':
                result['livingStatus'] = 'Alive'
            elif result['livingStatus'] == 'मृत':
                result['livingStatus'] = 'Deceased'

            members_data.append(result)

        # print(members_data)
        if len(members_data) > 0:
            df = pd.DataFrame(members_data).drop('_id', axis=1)
            if len(req_columns['columnList']) > 0:
                csv_cols.extend(req_columns['columnList'])
                df = df[csv_cols]

            df.to_csv('./temp/members_data.csv', index=False)
            if os.path.exists('./temp/members_data.csv'):
                return send_file('./temp/members_data.csv', as_attachment=True)
            # return {"status": "Success", "msg": "CSV created successfully"}
        else:
            return {"status": "Failed", "msg": "No CSV found"}
    except Exception as e:
        return {"status": "Failed", "msg": "Someting went wrong, please try again later!", "error": str(e)}
