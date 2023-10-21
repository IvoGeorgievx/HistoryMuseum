from backend.resources.ads import CreateAd
from backend.resources.auth import Register, Login, EditProfile, GetProfileRole
from backend.resources.index import Home

routes = (
    (Home, "/"),
    (Register, "/register"),
    (Login, "/login"),
    (EditProfile, "/edit_profile"),
    (CreateAd, "/create_ad"),
    (GetProfileRole, "/profile/role"),
)
