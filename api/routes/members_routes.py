from flask import Blueprint, request
from bson import ObjectId
from db import mongodb

member_routes = Blueprint('/api/members', __name__)


@member_routes.route('/api/members/test', methods=['GET'])
def test_route():
    return {'Status': 'Ok', 'code': 200}


@member_routes.route('/api/members/getmembers', methods=['GET'])
def get_members():
    try:
        results = mongodb.members.find()
        # print(results)
        members = []
        for result in results:
            result['_id'] = str(result['_id'])
            members.append(result)

        if len(members) > 0:
            return {"status": "Success", "msg": "Members found", "members": members}
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
    