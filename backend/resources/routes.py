from backend.resources.auth import Register, Login, EditProfile
from backend.resources.index import Home

routes = (
    (Home, "/"),
    (Register, "/register"),
    (Login, "/login"),
    (EditProfile, "/edit_profile")

)
