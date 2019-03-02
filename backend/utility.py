from hashlib import md5
from datetime import datetime, timezone
from .models import User, ActiveUser

def createHashPassword(password):
    m = md5()
    m.update(password.encode('utf-8'))
    return m.hexdigest()

def authenticateUser(token):
    if token==None:
        return None
    
    activeUsers = ActiveUser.objects.filter(token=token)

    print(activeUsers)

    if not activeUsers:
        return None
    
    now = datetime.now(timezone.utc)

    activeUser = activeUsers[0]
    duration = (now - activeUser.created).total_seconds()
    print(duration)
    timeLimit = 20

    if duration > timeLimit:
        activeUser.delete()
        return None
    
    activeUser.created = now
    activeUser.save()

    return activeUser

def findIfUserExist(username):
    user = User.objects.filter(username=username)

    if not user:
        return False
    return True