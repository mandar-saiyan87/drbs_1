from flask import Blueprint, request
from bson import ObjectId
import requests
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
