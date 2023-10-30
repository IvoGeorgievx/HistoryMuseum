from backend.resources.ads import CreateAd
from backend.resources.auth import Register, Login, GetProfileRole
from backend.resources.index import Home

routes = (
    (Home, "/"),
    (Register, "/register"),
    (Login, "/login"),

    (CreateAd, "/create_ad"),
    (GetProfileRole, "/profile/role"),
)
